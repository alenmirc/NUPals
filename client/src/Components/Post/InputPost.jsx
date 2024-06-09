import "../Post/InputPost.css";
import Profile from "../../assets/profile.png";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import React, { useState, useContext } from 'react';
import { UserContext } from '../../../context/userContext';
import axios from 'axios';
import {toast} from 'react-hot-toast'



const InputPost = ({firstName, profilePicture, defprofile}) => {
  const { user } = useContext(UserContext); // Get user info from context
  const userId = user?.id;
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [base64String, setBase64String] = useState('');

  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileSize = file.size;
    const maxSize = 10 * 1024 * 1024; // 10MB
  
    if (fileSize > maxSize) {
      toast.error('File size exceeds 10MB');
      return;
    }
  
    const reader = new FileReader();
  
    reader.onload = () => {
      const base64 = reader.result;
      setBase64String(base64);
    };
  
    if (file.type.includes('image')) {
      reader.readAsDataURL(file);
      setImage(file);
      setVideo(null); // Reset video if image is selected
    } else if (file.type.includes('video')) {
      reader.readAsDataURL(file);
      setVideo(file);
      setImage(null); // Reset image if video is selected
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User:', userId);
    console.log('Content:', body);
    console.log('Base64 string before sending:', base64String);
    
    const newPost = {
      userId,
      content: body,
      media: base64String
    };
    
    
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('content', body);
    formData.append('media', base64String); // No changes needed here
  
    axios.post('/createuserposting', formData)
    
      .then(response => {
        console.log(response);
        setBody('');
        setImage(null);
        setVideo(null);
        setBase64String('');
        toast.success('Post created successfully');
        window.location.reload()
      })
      .catch(error => {
        console.error(error);
        // Revert the optimistically updated posts list
        setPosts(posts.filter(post => post !== newPost));
        toast.error('Error creating post');
      });
  };
    
  return (
    <div className="i-form">
      <form onSubmit={handleSubmit}>
        <div className="i-input-box">
          <img src={profilePicture || defprofile} className='i-img' alt="Profile" />
          <input
            type="text"
            id="i-input"
            placeholder={`What's in your mind, ${firstName}?`} // Use user name dynamically
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <div className="file-upload">
          <div className="file-icons">
            <label htmlFor="file" className="pv-upload">
              <PhotoLibraryIcon className="input-svg" style={{ fontSize: "38px", color: "#35408e" }} />
              <span className='photo-dis'>Photo / Video</span>
            </label>
          </div>
          <button type='submit'>Share</button>
        </div>

        <input
          type="file"
          id="file"
          accept=".png,.jpeg,.jpg,.mp4"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {image && (
          <div className="displayImg">
            <CloseRoundedIcon onClick={() => setImage(null)} className="clear-icon" />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}

        {video && (
          <div className="displayImg">
            <CloseRoundedIcon onClick={() => setVideo(null)} className="clear-icon" />
            <video controls>
              <source src={URL.createObjectURL(video)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </form>
    </div>
  );
};

export default InputPost;

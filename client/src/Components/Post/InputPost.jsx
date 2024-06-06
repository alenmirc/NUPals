import "../Post/InputPost.css"
import Profile from "../../assets/profile.jpg"
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import React, { useState, useContext } from 'react';
import { UserContext } from '../../../context/userContext';
import axios from 'axios';

const InputPost = () => {
  const { user } = useContext(UserContext); // Get user info from context
  // console.log('User:', user); //pancheck ng laman ng user

  // Function to get cookie by name
  const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  };

  const token = getCookie('token'); // Get token from cookies
  //console.log('TOKEN:', token); //pancheck kung may token

  const [body, setBody] = useState('');
  const [images, setImages] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      console.error('No token found');
      return;
    }
    
    const userId = user.id; // Assuming user._id contains the user ID
    //console.log('User ID:', userId); //pancheck ng userid

    const postData = {
      userId,
      content: body
    };

    try {
      const { data } = await axios.post('/createpost', postData, {
        headers: {
          'Authorization': `Bearer ${token}` // Send the token in the header
        },
      });

      console.log('Post created:', data);
      setBody(''); // Clear the input field
      setImages(null); // Clear the images
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="i-form">
      <form onSubmit={handleSubmit}>
        <div className="i-input-box">
          <img src={Profile} className='i-img' alt="Profile" />
          <input
            type="text"
            id="i-input"
            placeholder={`What's in your mind, ${user?.firstName}?`} // Use user name dynamically
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <div className="file-upload">
          <div className="file-icons">
            <label htmlFor="file" className="pv-upload">
              <PhotoLibraryIcon className="input-svg" style={{ fontSize: "38px", color: "#35408e" }} />
              <span className='photo-dis'>Photo</span>
            </label>
            <div className="pv-upload">
              <PlayCircleFilledOutlinedIcon className="input-svg" style={{ fontSize: "38px", color: "#35408e" }} />
              <span className='photo-dis'>Video</span>
            </div>
          </div>
          <button type='submit'>Share</button>
        </div>

        <div style={{ display: "none" }}>
          <input
            type="file"
            id="file"
            accept=".png, .jpeg, .jpg"
            onChange={(e) => setImages(e.target.files[0])}
          />
        </div>

        {images && (
          <div className="displayImg">
            <CloseRoundedIcon onClick={() => setImages(null)} />
            <img src={URL.createObjectURL(images)} alt="" />
          </div>
        )}
      </form>
    </div>
  );
};



export default InputPost;
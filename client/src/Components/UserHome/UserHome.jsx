import React from 'react'
import "../Home/Homepage.css"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import {toast} from 'react-hot-toast'
import {AiOutlineDelete} from "react-icons/ai"
import defprofile from "../../assets/profile.png";

import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../../context/userContext';
import moment from 'moment';

function UserHome() {

  const [filledLike,setFilledLike] =useState(<FavoriteBorderOutlinedIcon />)
  const [unFilledLike,setUnFilledLike] =useState(false)    
  const [showDelete, setShowDelete] = useState([]);

  const [showComment,setShowComment] = useState(false)
  
  const [posts, setPosts] = useState([]);
  
  const { user } = useContext(UserContext); // Get user info from context
  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      axios.get(`/getpostbyid?userId=${userId}`) // Pass userId as a query parameter
        .then(response => {
          const postsData = response.data.sort((a, b) => b.createdAt - a.createdAt).reverse();
          setPosts(postsData);
          setShowDelete(Array(postsData.length).fill(false)); // Initialize showDelete array
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [userId]);
  

  useEffect(() => {
    posts.forEach(post => {
      console.log('Post ID:', post._id);
      console.log('User ID:', post.userId);
      console.log('User First Name:', post.userId?.firstName || 'Not Set'); // Handle null values
      console.log('User Last Name:', post.userId?.lastName || 'Not Set'); // Handle null values
      console.log('User ProfilePicture:', post.userId?.profilePicture || 'Not Set'); // Handle null values
      console.log('Content:', post.content);
      console.log('Media:', post.media);
    });
  }, [posts]);

  

  const handlelikes=()=>{
    setFilledLike(unFilledLike ?   <FavoriteBorderOutlinedIcon /> : <FavoriteRoundedIcon />)
    setUnFilledLike(!unFilledLike)
  }
  
  const handleDeletePost = (postId, index) => {
    axios.delete(`/deletepost/${postId}`)
      .then(response => {
        // Update the posts state to remove the deleted post
        setPosts(posts.filter(post => post._id !== postId));
        toast.success('Post deleted successfully!');
        // Hide the delete button for the deleted post
        const updatedShowDelete = [...showDelete];
        updatedShowDelete[index] = false;
        setShowDelete(updatedShowDelete);
      })
      .catch(error => {
        console.error(error);
        toast.error('Post delete error!');
      });
  };
  
  
return (
  <div className='posts'>
    {posts.map((post, index) => ( // Added index parameter
     <div key={post._id} className='post'>
      <div className='post'>
     <div className='post-header'>
       <Link to="/home" style={{ textDecoration: "none" }}>
         <div className='post-user' style={{ cursor: "pointer" }}>
           <img src={post.userId?.profilePicture || defprofile} className='p-img' alt="" />
           <h2>{post.userId?.firstName} {post.userId?.lastName}</h2>
           <p className='datePara'>{moment(post.createdAt).fromNow()}</p>
         </div>
       </Link>
       
       <div className='delete'>
                {showDelete[index] && (
                  <div className="options">
                    <button onClick={() => handleDeletePost(post._id, index)}><AiOutlineDelete />Delete</button>
                  </div>
                )}
        <MoreVertRoundedIcon
                  className='post-vertical-icon'
                  onClick={() => {
                    const updatedShowDelete = [...showDelete];
                    updatedShowDelete[index] = !updatedShowDelete[index];
                    setShowDelete(updatedShowDelete);
                  }}
                />
              </div>
     </div>

     <p className='body'>{post.content}</p>
     {post.media && (
    <div>
      {post.media.includes('image')? (
        <img src={post.media} alt="" className="post-img" />
      ) : (
        <video controls>
          <source src={post.media} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  )}
    <div className="post-foot">
     <div className="post-footer">
      <div className="like-icons">
        <p className='heart' 
         onClick={handlelikes}
          style={{marginTop:"5px"}}
        >
            {filledLike}
        </p>

        <MessageRoundedIcon 
          onClick= {()=>setShowComment(!showComment)}
          className='msg'  
        />

       
      </div>
      

      <div className="like-comment-details">
        <span className='post-like'>5 people like it,</span>
        <span className='post-comment'>5 comments</span>
      </div>
      
     {showComment && (<div className="commentSection">
      <form>
        <div className="cmtGroup">
            <SentimentSatisfiedRoundedIcon className='emoji'
            />
            
            <input 
            type="text" 
            id="commentInput"
            required
            placeholder='Add a comment...'
             />
            
            <button type='submit'><SendRoundedIcon className='send' /></button> 
        
        </div>
      </form>

      <div className="sticky">
        
        </div>
        
      </div>
      )}

    </div>     
  </div>
</div>
</div>
 ))}
 </div>
);
}
export default UserHome;

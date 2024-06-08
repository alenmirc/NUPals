import React from 'react'
import "../Home/Post.css"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';

import {AiOutlineDelete} from "react-icons/ai"
import img1 from "../../assets/Following/img-2.jpg"

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';


function Homepage() {

    const [filledLike,setFilledLike] =useState(<FavoriteBorderOutlinedIcon />)
    const [unFilledLike,setUnFilledLike] =useState(false)    
    const [showDelete,setShowDelete] = useState(false)
    const [showComment,setShowComment] = useState(false)
    
    const [posts, setPosts] = useState([]);
      


    useEffect(() => {
      axios.get('/getpost')
       .then(response => {
        const posts = response.data.sort((a, b) => b.createdAt - a.createdAt).reverse();
        setPosts(posts);
        })
       .catch(error => {
          console.error(error);
        });
    }, []);

    posts.forEach(post => {
      console.log('Post ID:', post._id);
      console.log('User ID:', post.userId);
      console.log('User First Name:', post.userId?.firstName);
      console.log('User Last Name:', post.userId?.lastName);
      console.log('Content:', post.content);
      console.log('Media:', post.media);
    });

    

    const handlelikes=()=>{
      setFilledLike(unFilledLike ?   <FavoriteBorderOutlinedIcon /> : <FavoriteRoundedIcon />)
      setUnFilledLike(!unFilledLike)

    
    }
   




  return (
    <div className='posts'>
      {posts.map(post => (
       <div key={post._id} className='post'>
        <div className='post'>
       <div className='post-header'>
         <Link to="/home" style={{ textDecoration: "none" }}>
           <div className='post-user' style={{ cursor: "pointer" }}>
             <img src={img1} className='p-img' alt="" />
             <h2>{post.userId?.firstName} {post.userId?.lastName}</h2>
             <p className='datePara'>{moment(post.createdAt).fromNow()}</p>
           </div>
         </Link>
         
         <div className='delete'>
         {showDelete && (<div className="options">
            <button><AiOutlineDelete />Delete</button>
         </div>
        
         )}
          <MoreVertRoundedIcon className='post-vertical-icon' onClick={()=>setShowDelete(!showDelete)}/>
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
export default Homepage;
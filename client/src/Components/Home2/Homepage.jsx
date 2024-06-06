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

import { useState } from 'react';
import { Link } from 'react-router-dom';



function Homepage() {

    const [filledLike,setFilledLike] =useState(<FavoriteBorderOutlinedIcon />)
    const [unFilledLike,setUnFilledLike] =useState(false)
  
    const handlelikes=()=>{
      setFilledLike(unFilledLike ?   <FavoriteBorderOutlinedIcon /> : <FavoriteRoundedIcon />)
      setUnFilledLike(!unFilledLike)
    }
   
  const [showDelete,setShowDelete] = useState(false)
  const [showComment,setShowComment] = useState(false)




  return (
    <div className='post'>
      <div className='post-header'>
        <Link to="/FriendsId" style={{textDecoration:"none"}}>
        <div className='post-user' style={{cursor:"pointer"}}>
            <img src={img1} className='p-img' alt="" />
            <h2>username</h2>
            <p className='datePara'>13days ago</p>
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

        <p className='body'>
        postbodypodybodybody</p>

       <img src={img1} alt="" className="post-img" />
  


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
  )
}

export default Homepage
import React, { useState } from 'react'
import "../LeftSide/Left.css"
import {AiOutlineHome} from "react-icons/ai"
import {AiOutlineSearch} from "react-icons/ai"
import {FiTrendingUp} from "react-icons/fi"
import { Link } from 'react-router-dom';
import {BsBookmark} from "react-icons/bs"
import {RiFileListLine} from "react-icons/ri"
import {FiSettings} from "react-icons/fi"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import Profile from "../../assets/profile.jpg"

import { UserContext } from '../../../context/userContext';
import { useContext } from 'react';


const Left = ({profileImg,
               modelDetails
              }) => {

  const [btnActive,setBtnActive] =useState("#")
  const [logOutExit,setLogOutExit] =useState(false)

  const { user, logout } = useContext(UserContext);

  return (
    <div className="L-features">
      <Link to="/home" style={{textDecoration:"none",color:"black"}}>
        <div onClick={()=>setBtnActive("#")} id='L-box' className={btnActive === "#" ? "active" : ""} >
          <AiOutlineHome className='margin'/>
          <span>Home</span>
        </div>
      </Link>
    
      <div id='L-box' onClick={()=>setBtnActive("#explore")} className={btnActive === "#explore" ? "active" : ""}>
        <AiOutlineSearch
          className='margin'/>
         <span>Find Pal</span>
      </div>

      <div id='L-box' onClick={()=>setBtnActive("#lists")} className={btnActive === "#lists" ? "active" : ""}>
        <RiFileListLine
        className='margin'/>
        <span>Messages</span>
      </div>

      <div id='L-box' onClick={()=>setBtnActive("#saved")} className={btnActive === "#saved" ? "active" : ""}>
        <BsBookmark
         className='margin'/>
        <span>Saved</span>
      </div>

      <div id='L-box' onClick={()=>setBtnActive("#settings")} className={btnActive === "#settings" ? "active" : ""}>
        <FiSettings 
        className='margin'/>
        <span>Settings</span>
      </div>

      <div className="left-user">
        <Link to="/profile" style={{textDecoration:"none",color:"black"}}>
          <div className="user-name-userid">
            <img src={profileImg ? (profileImg) : Profile} alt="" />
              <div className='L-user'>
                <h1>{modelDetails ? (modelDetails.ModelName) : ""} {!!user && (<h1>{user.firstName} {user.lastName}</h1>)}</h1>
                <span>{modelDetails ? (modelDetails.ModelUserName) : ""}{!!user && (<h1>{user.email}</h1>)}</span>
            </div>
          </div>
        </Link>
        <MoreHorizIcon onClick={()=>setLogOutExit(!logOutExit)} className='vert'/>
          
          {logOutExit && (
            <div className="logOutExitContainer">
              <Link to="/login" style={{width:"100%"}}><button onclick={logout}>Log out</button></Link>
            </div>
          )}
      </div>

    </div>
  )
}

export default Left
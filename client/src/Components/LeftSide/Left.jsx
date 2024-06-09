import React, { useState, useContext } from 'react';
import "../LeftSide/Left.css";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import {  FiSettings } from "react-icons/fi";
import { BsBookmark } from "react-icons/bs";
import { RiFileListLine } from "react-icons/ri";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from 'react-router-dom';
import Profile from "../../assets/profile.png";
import { UserContext } from '../../../context/userContext';

const Left = ({ firstName, lastName, profilePicture, email, defprofile }) => {
  const [btnActive, setBtnActive] = useState("#");
  const [logOutExit, setLogOutExit] = useState(false);
  const { user, logout } = useContext(UserContext);

  return (
    <div className="L-features">
      <Link to="/home" style={{ textDecoration: "none", color: "black" }}>
        <div onClick={() => setBtnActive("#")} id='L-box' className={btnActive === "#" ? "active" : ""}>
          <AiOutlineHome className='margin' />
          <span>Home</span>
        </div>
      </Link>

      <div id='L-box' onClick={() => setBtnActive("#explore")} className={btnActive === "#explore" ? "active" : ""}>
        <AiOutlineSearch className='margin' />
        <span>Find Pal</span>
      </div>

      <div id='L-box' onClick={() => setBtnActive("#lists")} className={btnActive === "#lists" ? "active" : ""}>
        <RiFileListLine className='margin' />
        <span>Messages</span>
      </div>

      <div id='L-box' onClick={() => setBtnActive("#saved")} className={btnActive === "#saved" ? "active" : ""}>
        <BsBookmark className='margin' />
        <span>Saved</span>
      </div>

      <div id='L-box' onClick={() => setBtnActive("#settings")} className={btnActive === "#settings" ? "active" : ""}>
        <FiSettings className='margin' />
        <span>Settings</span>
      </div>

      <div className="left-user">
        <Link to="/profile" style={{ textDecoration: "none", color: "black" }}>
          <div className="user-name-userid">
            <img src={profilePicture || defprofile}/>
            <div className='L-user'>
              <h1>{firstName} {lastName}</h1>
              <span>{email}</span>
            </div>
          </div>
        </Link>
        <MoreHorizIcon onClick={() => setLogOutExit(!logOutExit)} className='vert' />

        {logOutExit && (
          <div className="logOutExitContainer">
            <div onClick={logout} className="logout-button">
              Log out
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Left;

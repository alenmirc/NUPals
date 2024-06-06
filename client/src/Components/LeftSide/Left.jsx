import React, { useState, useContext } from 'react';
import "../LeftSide/Left.css";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { FiTrendingUp, FiSettings } from "react-icons/fi";
import { BsBookmark } from "react-icons/bs";
import { RiFileListLine } from "react-icons/ri";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from 'react-router-dom';
import Profile from "../../assets/profile.jpg";
import { UserContext } from '../../../context/userContext';

const Left = () => {
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
            <img src={user?.picturePath || Profile} alt="" />
            <div className='L-user'>
              <h1>{user?.firstName} {user?.lastName}</h1>
              <span>{user?.email}</span>
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

import React, { useContext } from 'react';
import './style.css';
import { Logout } from '@mui/icons-material';
import { UserContext } from '../../../context/userContext';

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  return (
    <section id="content">
    <nav>
      <i className='bx bx-menu'></i>
    
      <form action="#">
        <div className="form-input">
          <input type="search" placeholder="Search..." />
          <button type="submit" className="search-btn"><i className='bx bx-search'></i></button>
        </div>
      </form>
      
      <input type="checkbox" id="switch-mode" hidden />
    
      <a href="#" className="profile">
        <img src="img/people.png" alt="Profile" />
        
      </a>
      <button onClick={logout}>
      <Logout />
      <span className="text">Logout</span>
    </button>
    </nav></section>
  );
};

export default Navbar;

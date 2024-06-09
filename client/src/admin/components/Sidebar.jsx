import React from 'react';
import './style.css';
import { Dashboard, People, Description, Settings, Logout } from '@mui/icons-material'; // Import Material-UI icons

const Sidebar = () => {

  return (
    <section id="sidebar"> 
      <a href="#" className="brand">
        <i className='bx bxs-smile'></i>
        <span className="text">NU Pals</span>
      </a>
      <ul className="side-menu top">
        <li className="active">
          <a href="#">
            <Dashboard />
            <span className="text">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="#">
            <People />
            <span className="text">Users</span>
          </a>
        </li>
        <li>
          <a href="#">
            <Description />
            <span className="text">Post</span>
          </a>
        </li>
        <li>
          <a href="#">
            <Description />
            <span className="text">Test</span>
          </a>
        </li>
         <li>
          <a href="#">
            <Description />
            <span className="text">Test</span>
          </a>
        </li>
        <li>
          <a href="#">
            <Description />
            <span className="text">Test</span>
          </a>
        </li>
        <li>
          <a href="#">
            <Description />
            <span className="text">Test</span>
          </a>
        </li>
      </ul>
      <ul className="side-menu">
        <li>
          <a href="#">
            <Settings />
            <span className="text">Settings</span>
          </a>
        </li>
        <li>
          <a href="#" className="logout">
            <Logout />
            <span className="text">Logout</span>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;

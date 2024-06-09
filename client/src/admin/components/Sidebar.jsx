import React, { useContext } from 'react';
import './style.css';
import { Dashboard, People, Description, Settings, Logout } from '@mui/icons-material'; // Import Material-UI icons
import { Link } from 'react-router-dom';
import { UserContext } from '../../../context/userContext';

const Sidebar = () => {
  const { user, logout } = useContext(UserContext);
  return (
    <>
    <section id="sidebar"> 
      <a className="brand">
        <i className='bx bxs-smile'></i>
        <span className="text">NU Pals</span>
      </a>
      <ul className="side-menu top">
        <li className="active">
        <Link to="/admin/dashboard">
            <Dashboard />
            <span className="text">Dashboard</span>
          </Link>
        </li>
        <li>
        <Link to="/admin/users">
            <People />
            <span className="text">Users</span>
          </Link>
        </li>
        <li>
        <Link to="/admin/post">
            <Description />
            <span className="text">Post</span>
          </Link>
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
        <button className="logout" onClick={logout}>
      <Logout />
      <span className="text">Logout</span>
    </button>
          
        </li>
      </ul>
    </section>
    </>
  );
};

export default Sidebar;

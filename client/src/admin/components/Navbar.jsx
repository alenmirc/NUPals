import React from 'react';
import './style.css';

const Navbar = () => {
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
    </nav></section>
  );
};

export default Navbar;

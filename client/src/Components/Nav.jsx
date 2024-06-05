import React, { useState } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './nav.css';
import logo from './logo.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome, faEnvelope, faBell, faUser } from '@fortawesome/free-solid-svg-icons';

function Nav() {

    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };



    return (
        <nav className="navbar navbar-expand-lg custom-navbar">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src={logo} alt="Logo" className="logo-img"/>
                    <span className="system-name">NU PALS</span>
                </Link>
                <button className="navbar-toggler" type="button" onClick={toggleMobileMenu}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`}>
                    <form className="d-flex mx-auto my-2 my-lg-0 navbar-search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-search" type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                    </form>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 navbar-links">
                        <li className="nav-item">
                            <Link className="nav-link" to="/"><FontAwesomeIcon icon={faHome} /></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/message"><FontAwesomeIcon icon={faEnvelope} /></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/"><FontAwesomeIcon icon={faBell} /></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile"><FontAwesomeIcon icon={faUser} /></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;

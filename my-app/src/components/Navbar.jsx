import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaHome, FaBox, FaUsers, FaTools, FaExchangeAlt, FaEnvelope, FaInfoCircle, FaBars, FaCubes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h3>TNT Asset</h3>
          <button className="toggle-btn" onClick={toggleSidebar}>
            <FaBars />
          </button>
        </div>
        
        <div className="sidebar-content">
          <ul className="sidebar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <FaHome className="icon" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/assets" className="nav-link">
                <FaBox className="icon" />
                <span>Assets</span>
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/dealers" className="nav-link">
                <FaUsers className="icon" />
                <span>Dealers</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/maintainence" className="nav-link">
                <FaTools className="icon" />
                <span>Maintenance</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/transactions" className="nav-link">
                <FaExchangeAlt className="icon" />
                <span>Transactions</span>
              </Link>
            </li> */}
          </ul>

          <ul className="sidebar-footer">
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                <FaEnvelope className="icon" />
                <span>Contact Us</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/aboutus" className="nav-link">
                <FaInfoCircle className="icon" />
                <span>About Us</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={`content-wrapper ${isOpen ? 'shifted' : ''}`}>
        {/* Your main content goes here */}
      </div>
    </>
  );
};

export default Navbar;

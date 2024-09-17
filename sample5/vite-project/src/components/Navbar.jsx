import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './Assets/textilelogo.1.jpeg'

const Navbar = () => {
  return (
    <div className='nav'> <nav className='navbar'>
    <div className='navbar-left'>
      <img src={logo} alt=" " className='navbar-logo' />
      <Link to="/" className='navbar-title'>Textiles Genesis</Link>
    </div>
    <div className='navbar-right'>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/chat">Chat</Link>
      {/* <Link  to ="/">Logout</Link> */}
    </div>
  </nav></div>
   
  );
};

export default Navbar;

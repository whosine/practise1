import React from 'react';
import { Link } from 'react-router-dom';
import './Sidemenu.css';

const Sidemenu = ({ handleLogout }) => {
  return (
    <div>
      <aside className="sidemenu">
        <div className="side-menu-button">
          <span>+</span>
          New Chat
        </div>
        <div className="side-menu-button" onClick={handleLogout}>
          <span>+</span>
          Logout
        </div>
        <div className="side-menu-button">
          <Link to="/">Upload</Link>
        </div>
      </aside>
    </div>
  );
};

export default Sidemenu;

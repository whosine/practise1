import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidemenu from './Sidemenu';
import ChatComponent from './ChatComponent';

const ChatPage = ({ handleLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if token is not present
    }
  }, [navigate]);
  
  const divStyle = {
    backgroundColor: 'lightblue',
    
  }

  return (
    <div style={divStyle} >
      <Sidemenu handleLogout={handleLogout} />
      <ChatComponent />
    </div>
  );
};

export default ChatPage;

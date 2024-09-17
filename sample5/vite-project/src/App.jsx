import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import ChatPage from './ChatPage';
import axios from 'axios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.post('http://localhost:5000/validateToken', { token })
        .then(() => setIsAuthenticated(true))
        .catch(() => {
          localStorage.removeItem('token'); // Remove invalid token
          setIsAuthenticated(false);
        });
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token on logout
    setIsAuthenticated(false);
    navigate('/'); // Redirect to login page after logout
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/chat'); // Redirect to chat page after successful login
  };

  return (
    <div className='app'>
      <nav>
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        {isAuthenticated ? (
          <Route path="/chat" element={<ChatPage handleLogout={handleLogout} />} />
        ) : (
          <Route path="/chat" element={<Login onLogin={handleLogin} />} /> // Redirect to login if not authenticated
        )}
      </Routes>
    </div>
  );
}

export default App;


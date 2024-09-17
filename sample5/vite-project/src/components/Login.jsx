// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Login.css'; // Ensure you have styles for Login component

// const Login = ({ onLogin }) => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       localStorage.clear(); // Clear local storage before attempting to login

//       const response = await axios.post('http://localhost:5000/login', formData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       const { token } = response.data;
//       localStorage.setItem('token', token); // Store token in localStorage

//       // Clear the input fields after successful login
//       setFormData({
//         username: '',
//         password: '',
//       });

//       onLogin(); // Trigger parent component's login state update
//       navigate('/chat'); // Navigate to chat page upon successful login
//     } catch (error) {
//       setError('Invalid username or password');

//       // Clear the input fields after unsuccessful login attempt
//       setFormData({
//         username: '',
//         password: '',
//       });
//     }
//   };

//   return (
//     <div className="wrapper">
//       <form onSubmit={handleLogin}   action="/submit" method="post">
//         <h2>Login</h2>
//         {error && <div className="error-message">{error}</div>}
//         <div className="input-box">
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             placeholder="Username"
//             required
//             autoComplete="off"/>
//         </div>
//         <div className="input-box">
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Password"
//             required
//            autoComplete="off"/>
//         </div>
//         <input type="submit" value="Login" className="button" />
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Ensure you have styles for the Login component

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      localStorage.clear(); // Clear local storage before attempting to login

      const response = await axios.post('http://localhost:5000/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { token } = response.data;
      localStorage.setItem('token', token); // Store token in localStorage

      // Clear the input fields after successful login
      setFormData({
        username: '',
        password: '',
      });

      onLogin(); // Trigger parent component's login state update
      navigate('/chat'); // Navigate to chat page upon successful login
    } catch (error) {
      setError('Invalid username or password');
    } finally {
      // Always clear the input fields
      setFormData({
        username: '',
        password: '',
      });
    }
  };

  return (
    <div className="wrapper">
      <form 
        onSubmit={handleLogin} 
        action="/submit" 
        method="post"
      >
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="input-box">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
            autoComplete="off"
            className={formData.username ? 'filled' : ''}
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            autoComplete="new-password" // Disable browser auto-fill
            className={formData.password ? 'filled' : ''}
          />
        </div>
        <input type="submit" value="Login" className="button" />
      </form>
    </div>
  );
};

export default Login;

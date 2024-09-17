// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Signup.css'


// const SignUp = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [image, setImage] = useState(null);
//   const navigate = useNavigate();

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append('email', email);
//       formData.append('password', password); // Adding password to form data
//       formData.append('image', image);

//       const response = await axios.post('http://localhost:5000/signup', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log(response.data); // Handle success response
//       navigate('/login'); // Navigate to login page upon successful signup
//     } catch (err) {
//       console.error(err); // Handle error
//     }
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   return (
//     <div className="container">
//     <form onSubmit={handleSignUp}>
//       <h2>Sign Up</h2>
//       <input
//         type="text"
        
        
//         placeholder="User Name"
//       />
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//       />
      
//       <button type="submit" className='button'>Sign Up</button>
//     </form>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    reenterPassword: '',
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.reenterPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/signup', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data); // Log success response
      navigate('/login'); // Navigate to login page upon successful signup
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data); // Set server error message
      } else {
        setError('Failed to connect to the server'); // Handle network error
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSignUp}>
        <h2>Sign Up</h2>
        {error && <div className="error">{error}</div>} {/* Display error message */}
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="User Name"
          required // Add required attribute for form validation
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required // Add required attribute for form validation
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required // Add required attribute for form validation
        />
        <input
          type="password"
          name="reenterPassword"
          value={formData.reenterPassword}
          onChange={handleChange}
          placeholder="Re-enter Password"
          required // Add required attribute for form validation
        />
        <input type="submit" value="Sign Up" className="button" />
      </form>
    </div>
  );
};

export default SignUp;

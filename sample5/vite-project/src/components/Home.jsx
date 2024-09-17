import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import textileImage from './Assets/textilelogo.1.jpeg'; // Adjust the path as needed

const Home = () => {
  return (
    <div className="home-container">
      <div className="image-container">
        <img src={textileImage} alt="Textile" className="home-image" />
      </div>
      <div className="text-container">
        <h1>Welcome to Textiles</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet tristique mi, vel tincidunt metus. Integer nec magna auctor, sodales ex a, fermentum orci.</p>
        <p>Morbi sed efficitur libero. Phasellus vel mauris nisl. Etiam eget dolor mi. Integer at sapien ut libero vehicula luctus at et massa.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet tristique mi, vel tincidunt metus. Integer nec magna auctor, sodales ex a, fermentum orci.</p>

        <div className="button-container">
          {/* <Link to="/login" className="home-button">Login</Link>
          <Link to="/signup" className="home-button">Sign Up</Link> */}
        </div>
        <Link to="/signup" className="home-main-button">Get Started</Link>
      </div>
    </div>
  );
};

export default Home;

import React from 'react'
import './homepage.css';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="homepage">
      {/* Navbar */}
      <div className="navbar">
        <div className="logo">
          <span className="logo-text">Developer Hub</span>
        </div>
        <div className="nav-links">
          <a href="/register">Register</a>
          <a href="/login">Login</a>
        </div>
      </div>

      {/* Main content */}
      <div className="main-content">
        <h1>Welcome to Developer Hub</h1>
        <p>Explore opportunities in the world of freelancing.</p>

        {/* Buttons */}
        <div className="buttons">
   <Link to="/login"> <button className="login-button">Login</button></Link>
  <Link to="/register"> <button className="signup-button" >Sign Up</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Homepage
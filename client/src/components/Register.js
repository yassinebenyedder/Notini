import React, { useState } from 'react';
import './Register.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import img2 from '../assets/register.webp';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if(!username || !email || !password || !confirmPassword){
        setErrorMessage('All fields are required!');
        return;
    } else if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }
    try {
      const res = await Axios.post(`${process.env.REACT_APP_API_BASE_URL}/authentication/register`, {
        username: username,
        email: email,
        password: password,
      });
      // If response is successfull
      if (res.status === 201) {
          setErrorMessage('');
        setSuccessMessage('Register successful!'); 
        // Redirect after 2 second to the login page
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      // Handle error messages from the server
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Server error. Please try again later.');
      }
      console.log("Registration failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <img src={img2} alt='Register' className="register-image" />
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Create Account</h2>
          <p>Fill in the details to register</p>

          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              placeholder="Enter your username"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="Enter your password"
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input 
              type="password" 
              id="confirm-password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
              placeholder="Confirm your password"
            />
            <h5 className="register-text">You have an account? 
              <Link to="/login" className="register-link"> Log In</Link>
            </h5>
          </div>

          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

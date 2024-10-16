import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

function Header({ userName, onSearch }) {
  const firstLetter = userName.charAt(0).toUpperCase();
  const [searchTerm, setSearchTerm] = useState('');
  const [,, removeCookie] = useCookies(['access_token']);
  

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    // Pass the search query back to the parent component
    onSearch(query); 
  };
  const handleLogout = () => {
    // Clear the authentication cookie and local storage
    removeCookie('access_token', { path: '/' });
    window.localStorage.removeItem('userID');
    window.localStorage.removeItem('username');
  };

  return (
    <div className="navbar">
      {/* Logo Section */}
      <div className="logo" >
        <h1>N o t i n i</h1>
      </div>
      {/* Search Bar Section */}
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search Notes by title or tags"
          value={searchTerm}
          onChange={handleSearch}
        />
        <i className="fi fi-bs-search search-icon"></i>
      </div>
      {/* User profile section with name and logout button*/}
      <div className="user-profile">
        <div className="user-initial">
          {/* Display the first letter of username */}
          {firstLetter} 
        </div>
        <div className="user-info">
          <Link to="/">{userName}</Link>
          <Link onClick={handleLogout} to="/login" className="logout">Logout</Link>
        </div>
      </div>
    </div>
  );
}

export default Header;

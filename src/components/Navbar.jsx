import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAccessToken, clearTokens } from '../utils/authService';

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!getAccessToken();
  const token = getAccessToken();
  const [searchTerm, setSearchTerm] = useState('');

  const currentUser = token ? JSON.parse(atob(token.split('.')[1])) : null;
  const fullName = currentUser ? `${currentUser.first_name} ${currentUser.last_name}` : 'User';

  const handleLogout = () => {
    clearTokens();
    navigate('/login');
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex="0" role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> 
            </svg>
          </div>
          <ul
            tabIndex="0"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-lg"
          >
            {!isLoggedIn ? (
              <>
                <li>
                  <Link to="/login" className="text-primary font-medium hover:bg-base-200 rounded-md">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="text-primary font-medium hover:bg-base-200 rounded-md">
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/add-post"
                    className="text-blue-600 font-medium hover:bg-base-200 rounded-md"
                  >
                    📝 Create New Post
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-error font-medium hover:bg-base-200 rounded-md w-full text-left"
                  >
                    🚪 Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      
      <div className="navbar-center">
        <Link className="btn btn-ghost text-xl" to="/">Maktoob</Link>
      </div>
      
      <div className="navbar-end">
        <div className="form-control mr-4">
          <input
            type="text"
            placeholder="Search posts..."
            className="input input-bordered"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
        </div>

        {isLoggedIn && (
          <div className="md:flex items-center gap-2 mr-4">
            <span className="font-semibold text-white-700">Welcome,</span>
            <span className="font-semibold">{fullName}</span>
          </div>
        )}

        {/* <button className="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> 
          </svg>
        </button>

        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> 
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button> */}
      </div>
    </div>
  );
}

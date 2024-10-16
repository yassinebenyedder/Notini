import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import NotesPage from './components/NotesPage';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';
import ProtectedRoute from './components/ProtectedRoutes';

export default function App() {
  const location = useLocation();

  const getBodyClass = () => {
    if (location.pathname === '/login' || location.pathname === '/register') {
      // No margin for login and register pages
      return 'no-navbar'; 
    }
    // Margin for pages with navbar
    return 'with-navbar'; 
  };

  return (
    <div className={getBodyClass()}>
     <Routes>
     <Route path="/" element={<ProtectedRoute element={<NotesPage />} />} />
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/register' element={<RegisterPage/>}/>
    </Routes>
    </div>
  );
}



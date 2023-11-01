// Program Intention: Handle the routes of the website
// Input/Output: Handle the click of each route
// Run Intention: Run with the entire website

// Import files and dependencies here
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  // Routes of the website

  return (
    <>
      <Routes>
        {/* Routes of the website */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;

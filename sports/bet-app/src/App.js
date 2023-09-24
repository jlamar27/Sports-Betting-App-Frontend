import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Games from './components/Games.js';
import Navbar from './components/Navbar.js';
import Profile from './components/Profile.js';
import Home from './components/Home.js';
import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js';

function App() {
  return (
    <div className="App">
        <Navbar />
        <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/games" element={<Games />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth/signup" element={<SignUp/>} />
        <Route path="/auth/signin" element={<SignIn/>} />
        </Routes>
    </div>
  );
}

export default App;

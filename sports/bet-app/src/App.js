import { React, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Games from './components/Games.js';
import Navbar from './components/Navbar.js';
import Profile from './components/Profile.js';
import Home from './components/Home.js';
import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js';
import { AuthContext } from './context/AuthContext.js';



function App() {
  // const { isLoggedIn, setIsLoggedIn } = useContext (AuthContext)
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)

  return (
    <div className="App">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
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

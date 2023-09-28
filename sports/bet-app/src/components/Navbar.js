import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {

    const { isLoggedIn, setIsLoggedIn, handleLogout } = useContext(AuthContext)

  return (
    <div className="navbar ">
    <button className="nav-button">
        <Link to="/games">Games</Link>
    </button>

    <button className="nav-button">
        <Link to="/profile">My Gold</Link>
    </button>

    <button className="nav-button">
        <Link to="/">Home</Link>
    </button>

    <button className="nav-button">
        <Link to="/scores">Scores</Link>
    </button>

    {
    isLoggedIn ? (
        <button className="nav-button" onClick={handleLogout}>
            Log Out
        </button>
    ) : (
        <button className="nav-button">
            
            <Link to="/auth/signin">Log In</Link>
        </button>
    )
}

    
    </div>
  )
}

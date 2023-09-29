import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Medal from '../images/medal.svg';

export default function Navbar() {
    const { isLoggedIn, setIsLoggedIn, handleLogout } = useContext(AuthContext)


    return (
        <div className="navbar ">
           <button className="nav" style={{ color: "#fff" }}>
              <Link to="/">Home</Link>
           </button>
            <img className="medal" src={Medal}></img>
        <button className="nav" style={{ color: "#fff" }}>
            <Link to="/games">Games</Link>
         </button>

            {isLoggedIn && (
               <button className="nav" style={{ color: "#fff" }}>
                  <Link to="/profile">My Gold</Link>
               </button>
            )}

            {isLoggedIn ? (
            <button className="nav" style={{ color: "#fff" }} onClick={handleLogout}>
                    Log Out
                </button>
            ) : (
            <button className="nav" style={{ color: "#fff" }}>
                    <Link to="/auth/signin">Log In</Link>
                </button>
            )}
        </div>
    )
}

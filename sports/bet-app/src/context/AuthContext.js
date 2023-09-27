import React, { createContext, useEffect, useState } from 'react';
import { isTokenValid } from '../api/auth';

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    console.log("Hereeeeeeeeee")
    // isTokenValid().then((response) => console.log(response))
    // isTokenValid().then((response) => setIsLoggedIn(response.valid))
    async function isValid() {
      try{
        const response = await isTokenValid();
        setIsLoggedIn(response.valid);
      } catch(error) {
        console.log("Error token is invalid", error);
      }
    }
    isValid();
  }, []);

  return (
    <AuthContext.Provider value={{
      isLoggedIn, setIsLoggedIn, user, handleLogout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider };

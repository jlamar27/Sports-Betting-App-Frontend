import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from '../api/auth'

export default function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const response = await signup(username, password)
    console.log(response);
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input 
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button>Signup</button>
      </form>
      <span>
        {'Already have an account?'}
        <Link to="/auth/signin">Go to Signin</Link>
        
      </span>
    </div>
  )
}
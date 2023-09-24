import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin } from '../api/auth'
import { AuthContext } from "../context/AuthContext";

export default function Signin() {
  const [text, setText] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { setIsLoggedIn } = useContext(AuthContext)

  async function handleSubmit(e) {
    e.preventDefault()
    const response = await signin(text, password)
    setIsLoggedIn(true)
    navigate('/')
    console.log(response);
  }

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button>Signin</button>
      </form>
      <span>
        { `Don't have an account?`}
        <Link to="/auth/signup">Signup</Link>
        
      </span>
    </div>
  )
}
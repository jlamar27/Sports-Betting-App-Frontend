import api from './apiConfig.js'

const LOCALSTORAGE_KEY = process.env.REACT_APP_LOCALSTORAGE_KEY

export async function signin(username, password) {
  // Make request to singin user to retrieve a token
  const response = await api.post('http://localhost:3000/api/auth/signin', {
      username, password
  })

  // Put the token on localstorage, for 30min (duration set in server)
  localStorage.setItem(LOCALSTORAGE_KEY, response.data.token)
  localStorage.setItem("userId", response.data.user)
  return response.data
}

export async function signup(username, password) {
  const response = await api.post('http://localhost:3000/api/auth/signup', {
      username, password
  })

  return response.data
}

export async function isTokenValid() {
  const response = await api.get('/auth/isTokenValid')
  return response.data
}
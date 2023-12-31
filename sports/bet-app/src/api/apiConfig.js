import axios from 'axios'


// Define the local storage key 
const LOCALSTORAGE_KEY = process.env.REACT_APP_LOCALSTORAGE_KEY
const API_URL = process.env.REACT_APP_ENVIRONMENT === "development" ?
  process.env.REACT_APP_LOCAL_API_URL:
  'http://<my hosted api>'
console.log(API_URL)
// Create a re-useable axios object, with our API as the baseURL
const api = axios.create({
  baseURL: API_URL,
})

// Interceptors are axios functionality, that allows you to intercept requests and responses
// Here we're setting the token in localstorage to the Authorization header
api.interceptors.request.use(config => {
  const token = localStorage.getItem(LOCALSTORAGE_KEY)
  config.headers.Authorization = token
  return config
})

export default api

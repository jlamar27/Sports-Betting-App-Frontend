import api from "./apiConfig.js";

export async function getProfile(id) {
  const response = await api.get(`/user/${id}`)
  return response.data
}

export async function addCredits(credits, id) {
 const response = await api.post(`/user/${id}`, {amount: credits})
 return response.data
}
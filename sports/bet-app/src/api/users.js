import api from "./apiConfig.js";

export async function getProfile(id) {
  const response = await api.get(`/user/${id}`)
  return response.data
}
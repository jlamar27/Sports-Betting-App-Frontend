import api from "./apiConfig";

export async function getProfile(handle) {
  const response = await api.get(`/user/${handle}`)
  return response.data
}
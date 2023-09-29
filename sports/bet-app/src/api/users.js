import api from "./apiConfig.js";

export async function getProfile(id) {
  const response = await api.get(`/user/${id}`)
  return response.data
}

export async function addCredits(credits, id) {
 const response = await api.post(`/user/${id}`, {amount: credits})
 return response.data
}

// export const updateUserCredits = async (userId, newCredits) => {
//     console.log(`Update credits for user ${userId} to ${newCredits}`);
//     // TODO: Replace with actual implementation to update user credits
//     return Promise.resolve(); // Placeholder: Replace with actual API call
//   };
  
import api from './apiConfig.js';

export async function createBet(userId, mergedBetSlip) {
    const response = await api.post(`/bet/${userId}`, {
        mergedBetSlip
    });
    return response.data;
}

export async function getSingleBet(userId, id) {
    const response = await api.get(`/bet/${userId}/${id}`);
    return response.data;
}

export async function updateBet(userId, id, outcome) {
    const response = await api.post(`/bet/${userId}/${id}`, {
        outcome
    });
    return response.data;
}
// export const updateBet = async (betId, update) => {
//     console.log(`Update bet ${betId} with `, update);
//     // TODO: Replace with actual implementation to update bet
//     return Promise.resolve(); // Placeholder: Replace with actual API call
//   };
  
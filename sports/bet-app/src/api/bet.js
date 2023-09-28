import api from './apiConfig.js';

export async function createBet(userId, mergedBetSlip) {
    const response = await api.post(`/bet/${userId}`, {
        mergedBetSlip
    });
    return response.data;
}
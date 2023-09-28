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
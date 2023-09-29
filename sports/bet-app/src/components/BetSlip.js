import React, { useState } from 'react';
import { createBet } from '../api/bet';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function BetSlip({ betSlip, updateBetSlip }) {
  const [betValues, setBetValues] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate
  
  const calculateReturn = (price, value) => {
    const odds = parseFloat(price);
    const betValue = parseFloat(value);
    if (isNaN(odds) || isNaN(betValue) || betValue <= 0) return 'N/A';

    if (odds > 0) return ((odds / 100) * betValue + betValue).toFixed(2);
    if (odds < 0) return ((100 / Math.abs(odds)) * betValue + betValue).toFixed(2);
    return 'N/A';
  };

  const handleBetValueChange = (index, value) => {
    setBetValues(prev => {
      const newBetValues = { ...prev };
      newBetValues[index] = Number(value);
      return newBetValues;
    });
  };

  const userId = localStorage.getItem('userId');

  const handlePlaceBet = async () => {
    try {
      const mergedBetSlip = betSlip.map((bet, index) => {
        const betValue = betValues[index] || 0;
        const potentialReturn = parseFloat(calculateReturn(bet.price, betValue));
        return {
          ...bet,
          betValue,
          potentialReturn,
        };
      });

      await createBet(userId, mergedBetSlip);
      navigate('/profile'); // Navigate to Profile page after placing bet
      
    } catch (error) {
      console.error('Error placing the bet', error);
    }
  };

  const handleRemoveBet = (index) => {
    updateBetSlip(prev => prev.filter((_, i) => i !== index));
    setBetValues(prev => {
      const newValues = { ...prev };
      delete newValues[index];
      return newValues;
    });
  };

  return (
    <div className="bet-slip">
      <h2>BetSlip</h2>
      {betSlip.length === 0 ? (
        <div>Your bet slip is empty.</div>
      ) : (
        betSlip.map((bet, index) => (
          <div key={index} className="bet-slip-item">
            <p>Type: {bet.type}</p>
            {bet.subtype && <p>Subtype: {bet.subtype}</p>}
            <p>Team: {bet.team}</p>
            <p>Point: {bet.point}</p>
            <p>Price: {bet.price}</p>
            <p>Potential Return: {calculateReturn(bet.price, betValues[index] || 0)} coins</p>
            <p>Commence Time: {new Date(bet.commence_time).toLocaleString("en-US")}</p>
            <label htmlFor={`betValue-${index}`}>Bet Value:</label>
            <input
              type="number"
              id={`betValue-${index}`}
              value={betValues[index] || ''}
              onChange={(e) => handleBetValueChange(index, e.target.value)}
              placeholder="Enter bet value"
            />
            <button onClick={() => handleRemoveBet(index)}>Remove</button>
          </div>
        ))
      )}
      {betSlip.length > 0 && <button onClick={handlePlaceBet}>Place Bet</button>}
    </div>
  );
}

export default BetSlip;

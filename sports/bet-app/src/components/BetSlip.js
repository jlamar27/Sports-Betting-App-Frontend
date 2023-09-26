import React, { useState } from 'react';
import axios from 'axios';

function BetSlip({ betSlip, updateBetSlip }) {
  const [betValues, setBetValues] = useState({});

  const calculateReturn = (price, value) => {
    const odds = parseFloat(price);
    const betValue = parseFloat(value);
    if (isNaN(odds) || isNaN(betValue) || betValue <= 0) return 'N/A';

    if (odds > 0) {
        return ((odds / 100) * betValue + betValue).toFixed(2);
    }

    if (odds < 0) {
        return ((100 / Math.abs(odds)) * betValue + betValue).toFixed(2);
    }
    return 'N/A';
  };

  const handleBetValueChange = (index, value) => {
    setBetValues(prev => {
      const newBetValues = { ...prev };
      newBetValues[index] = value;
      return newBetValues;
    });
  };

  const handlePlaceBet = async () => {
    try {
      // Replace with your API Endpoint and adjust the payload as needed.
      const response = await axios.post('/api/placeBet', { bets: betSlip, betValues });
      console.log(response.data);
    } catch (error) {
      console.error('Error placing bet', error);
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
            <p>
              Potential Return: {calculateReturn(bet.price, betValues[index] || 0)} coins
            </p>
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

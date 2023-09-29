import React, { useState } from 'react';
import { createBet } from '../api/bet';

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
      newBetValues[index] = Number(value);
      console.log(typeof(newBetValues[index]));
      return newBetValues;
    });
  };

  const userId = localStorage.getItem('userId');

  const handlePlaceBet = async () => {
    const token = localStorage.getItem('token')
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
    
        console.log(userId, mergedBetSlip);

        await createBet(userId, mergedBetSlip);

      } catch (error) {
      if (error.response) {
       
      } else if (error.request) {
        console.error('No response received', error.request);
      } else {
        console.error('Error setting up the request', error.message);
      }
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
            <p className='potential-return'>
              Potential Return: {calculateReturn(bet.price, betValues[index] || 0)} coins
            </p>
            <p>Commence Time: {new Date(bet.commence_time).toLocaleString("en-US")}</p>
            <label htmlFor={`betValue-${index}`}>Bet Value:</label>
            <input
              type="number"
              id={`betValue-${index}`}
              value={betValues[index] || ''}
              onChange={(e) => handleBetValueChange(index, e.target.value)}
              placeholder="Enter bet value"
            />
               <button className="remove-bet" onClick={() => handleRemoveBet(index)}><strong>X</strong></button>
          </div>
        ))
      )}
              {betSlip.length > 0 && <button className='place-bet' onClick={handlePlaceBet}>Place Bet</button>}
    </div>
  );
}

export default BetSlip;

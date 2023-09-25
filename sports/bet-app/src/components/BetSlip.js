import React, { useState } from 'react';

function BetSlip({ betSlip }) {
  const [betValue, setBetValue] = useState('');

  const calculateReturn = (price, value) => {
    const odds = parseFloat(price);
    const betValue = parseFloat(value);
    if (isNaN(odds) || isNaN(betValue) || betValue <= 0) return 'N/A';
    // For Positive Odds
    if (odds > 0) {
        return ((odds / 100) * betValue + betValue).toFixed(2); // profit plus initial bet
    }
    // For Negative Odds
    if (odds < 0) {
        return ((100 / Math.abs(odds)) * betValue + betValue).toFixed(2); // profit plus initial bet
    }
    return 'N/A';
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
              Potential Return:{' '}
              {calculateReturn(bet.price, betValue)} coins
            </p>
            <label htmlFor="betValue">Bet Value:</label>
      <input
        type="number"
        id="betValue"
        value={betValue}
        onChange={(e) => setBetValue(e.target.value)}
        placeholder="Enter bet value"
      />
          </div>
        ))
      )}
    </div>
  );
}

export default BetSlip;

import React, { useState, useEffect } from "react";
import axios from "axios";
import BetSlip from "./BetSlip";
import Game from "./Game";
import '../fonts/espn.woff'; 



function Games() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [betSlip, setBetSlip] = useState([]);
  const apiKey = process.env.REACT_APP_API_KEY;


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?apiKey=${apiKey}&regions=us&markets=h2h,spreads,totals&oddsFormat=american`);
        setMatches(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the data", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const addToBetSlip = (bet) => {
    setBetSlip((prev) => {
      const newBetSlip = [...prev, bet];
      return newBetSlip;
    });
  };

  return (
    <div className="Games-container">
      <header className="Games">
        <h1 className="gameday-gold">Gameday Gold</h1>
        <p className="nfl-match">NFL Matches</p>
        <div className="content-container">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div className="match-list">
                {matches.map((match) => (
                  <Game key={match.id} match={match} addToBetSlip={addToBetSlip} gameid={match.id} />
                ))}
              </div>
              <BetSlip betSlip={betSlip} updateBetSlip={setBetSlip} />
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default Games;

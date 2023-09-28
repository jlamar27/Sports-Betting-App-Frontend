import React, { useState, useEffect } from "react";
import axios from "axios";
import BetSlip from "./BetSlip";
import Game from "./Game"; // Make sure to import the Game component here

function Games() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [betSlip, setBetSlip] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!localStorage.getItem("matches")) {
            const response = await axios.get("https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?apiKey=d486c733f9abeee8fb46d57bc84d42e1&regions=us&markets=h2h,spreads,totals&oddsFormat=american");
            localStorage.setItem("matches", JSON.stringify(response.data));
            setMatches(response.data);
            setLoading(false);
            
        } else {
            const cachedMatches = JSON.parse(localStorage.getItem("matches"))
            setMatches(cachedMatches);
            setLoading(false);
        }
    } catch (error) {
        console.error("Error fetching the data", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  console.log(matches)

  const addToBetSlip = (bet) => {
    setBetSlip((prev) => {
      const newBetSlip = [...prev, bet];
      localStorage.setItem("betSlip", JSON.stringify(newBetSlip));
      console.log(newBetSlip)
      return newBetSlip;
    });
  };

  return (
    
    <div className="Games-container">
      <header className="Games">
        <h1>NFL Matches</h1>
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

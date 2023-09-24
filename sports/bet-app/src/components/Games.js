import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Games() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?apiKey=db674826a04c54b81c83dd4c0f1c48d1&regions=us&markets=h2h,spreads&oddsFormat=american');
        setMatches(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the data", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="Games">
      <header className="Games-header">
        <h1>NFL Matches</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="match-list">
            {matches.map(match => {
              const eventDate = new Date(match.commence_time);
              const options = { timeZone: "America/New_York", year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
              const formattedDate = eventDate.toLocaleString("en-US", options);
              const bookmaker = match.bookmakers && match.bookmakers.find(bm => bm.key === "draftkings");
              return (
                <div className="match-card" key={match.id}>
                  <div className="team">
                    <span className="team-name">{match.home_team}</span>
                    <div className="team-bet-buttons">
                      <button>Spread {bookmaker?.markets[0]?.outcomes[0]?.odds}</button>
                      <button>O/U {bookmaker?.markets[1]?.outcomes[0]?.odds}</button>
                      <button>Moneyline {bookmaker?.markets[2]?.outcomes[0]?.odds}</button>
                    </div>
                  </div>
                  <div className="team">
                    <span className="team-name">{match.away_team}</span>
                    <div className="team-bet-buttons">
                      <button>Spread {bookmaker?.markets[0]?.outcomes[1]?.odds}</button>
                      <button>O/U {bookmaker?.markets[1]?.outcomes[1]?.odds}</button>
                      <button>Moneyline {bookmaker?.markets[2]?.outcomes[1]?.odds}</button>
                    </div>
                  </div>
                  <div className="date-time">{formattedDate}</div>
                  <div className="bookmaker">Bookmaker: {bookmaker?.title}</div>
                </div>
              );
            })}
          </div>
        )}
      </header>
    </div>
  );
}

export default Games;

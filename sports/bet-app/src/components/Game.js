import React from 'react';

function Game({ match, addToBetSlip }) {
  const eventDate = new Date(match.commence_time);
  const options = {
    timeZone: "America/New_York",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedDate = eventDate.toLocaleString("en-US", options);
  const bookmaker = match.bookmakers && match.bookmakers.find((bm) => bm.key === "draftkings");
  
  const spreadMarket = bookmaker?.markets.find((market) => market.key === "spreads");
  const overUnderMarket = bookmaker?.markets.find((market) => market.key === "totals");
  const moneylineMarket = bookmaker?.markets.find((market) => market.key === "h2h");

  const spreadOddsHome = spreadMarket?.outcomes.find((outcome) => outcome.name === match.home_team);
  const spreadOddsAway = spreadMarket?.outcomes.find((outcome) => outcome.name === match.away_team);

  const overUnderOddsOver = overUnderMarket?.outcomes.find((outcome) => outcome.name.toLowerCase().includes("over"));
  const overUnderOddsUnder = overUnderMarket?.outcomes.find((outcome) => outcome.name.toLowerCase().includes("under"));
  const overUnderPoint = overUnderOddsOver?.point || overUnderOddsUnder?.point || "N/A";

  const moneylineOddsHome = moneylineMarket?.outcomes.find((outcome) => outcome.name === match.home_team);
  const moneylineOddsAway = moneylineMarket?.outcomes.find((outcome) => outcome.name === match.away_team);
  
  return (
    <div className="match-card">
      <div className="team">
        <span className="team-name">{match.home_team}</span>
        <div className="team-bet-buttons">
          <button onClick={() => addToBetSlip({
            type: "Spread",
            team: match.home_team,
            point: spreadOddsHome?.point,
            price: spreadOddsHome?.price,
          })}>
            Spread {spreadOddsHome ? `${spreadOddsHome.point} (${spreadOddsHome.price})` : "N/A"}
          </button>
          <button onClick={() => addToBetSlip({
            type: "O/U",
            subtype: "Over",
            team: match.home_team,
            point: overUnderPoint,
            price: overUnderOddsOver?.price,
          })}>
            O/U {overUnderPoint !== "N/A" ? `Over ${overUnderPoint} (${overUnderOddsOver?.price || "N/A"})` : "N/A"}
          </button>
          <button onClick={() => addToBetSlip({
            type: "Moneyline",
            team: match.home_team,
            price: moneylineOddsHome?.price,
          })}>
            Moneyline {moneylineOddsHome ? moneylineOddsHome.price : "N/A"}
          </button>
        </div>
      </div>
      <div className="team">
        <span className="team-name">{match.away_team}</span>
        <div className="team-bet-buttons">
          <button onClick={() => addToBetSlip({
            type: "Spread",
            team: match.away_team,
            point: spreadOddsAway?.point,
            price: spreadOddsAway?.price,
          })}>
            Spread {spreadOddsAway ? `${spreadOddsAway.point} (${spreadOddsAway.price})` : "N/A"}
          </button>
          <button onClick={() => addToBetSlip({
            type: "O/U",
            subtype: "Under",
            team: match.away_team,
            point: overUnderPoint,
            price: overUnderOddsUnder?.price,
          })}>
            O/U {overUnderPoint !== "N/A" ? `Under ${overUnderPoint} (${overUnderOddsUnder?.price || "N/A"})` : "N/A"}
          </button>
          <button onClick={() => addToBetSlip({
            type: "Moneyline",
            team: match.away_team,
            price: moneylineOddsAway?.price,
          })}>
            Moneyline {moneylineOddsAway ? moneylineOddsAway.price : "N/A"}
          </button>
        </div>
      </div>
      <div className="date-time">{formattedDate}</div>
      <div className="bookmaker">Bookmaker: {bookmaker?.title}</div>
    </div>
  );
}

export default Game;

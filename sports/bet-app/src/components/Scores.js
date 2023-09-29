import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Scores() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const cachedScores = localStorage.getItem("scores");
    if (cachedScores) {
      setScores(JSON.parse(cachedScores));
    }
  }, []);

  const handleRefresh = async () => {
    try {
      const response = await axios.get(
        "https://api.the-odds-api.com/v4/sports/americanfootball_nfl/scores/?daysFrom=3&apiKey=d486c733f9abeee8fb46d57bc84d42e1"
      );

      console.log("Fetched Scores", response.data)


      localStorage.setItem("scores", JSON.stringify(response.data));
      setScores(response.data);
    } catch (error) {
      console.error("Error fetching the data", error);
    }
  };

  return (
    <div>
      <div>Scores</div>
      <button onClick={handleRefresh}>Refresh Scores</button>
    </div>
  );
}

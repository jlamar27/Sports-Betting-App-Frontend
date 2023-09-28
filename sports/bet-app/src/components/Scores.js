import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";




export default function Scores() {

    const [scores, setScores] = useState([]);



  useEffect(() => {
    async function fetchData() {
      try {
        if (!localStorage.getItem("scores")) {
          const response = await axios.get(
            "https://api.the-odds-api.com/v4/sports/americanfootball_nfl/scores/?daysFrom=3&apiKey=d486c733f9abeee8fb46d57bc84d42e1"
          );
          localStorage.setItem("scores", JSON.stringify(response.data));
          setScores(response.data);
        } else {
          const cachedScores = JSON.parse(localStorage.getItem("scores"));
          setScores(cachedScores);
        }
      } catch (error) {
        console.error("Error fetching the data", error);
      }
    }
    fetchData();
  }, []);
  console.log(scores)

  return <div>Scores</div>;
}

import React, { useEffect, useState } from "react";
import { getProfile } from "../api/users";
import { getSingleBet } from "../api/bet";
import { addCredits } from "../api/users"; 
import { updateBet } from "../api/bet";
import Image from "../images/bag.png";
import axios from "axios";

function Profile() {
  const [userName, setUserName] = useState("Username");
  const [credits, setCredits] = useState(1000);
  const [betHistory, setBetHistory] = useState([]);
  const [gameScores, setGameScores] = useState([]);
  const [betOutcomes, setBetOutcomes] = useState([]);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getProfile(userId);
        setUserName(userData.username);
        setCredits(userData.virtualMoney);

        const betHistoryPromises = userData.bets.map(async (betId) => {
          const betData = await getSingleBet(userId, betId);
          return betData;
        });

        const betHistory = await Promise.all(betHistoryPromises);
        setBetHistory(betHistory);

        const cachedScores = JSON.parse(localStorage.getItem("scores"));
        if (cachedScores) setGameScores(cachedScores);
        console.log("betHistory :", betHistory)
      } catch (error) {
        console.error("Error fetching the data", error);
      }
    }
    fetchData();
  }, [userId]);

  useEffect(() => {
    setBetOutcomes(determineBetOutcome(betHistory, gameScores));
  }, [betHistory, gameScores]);
  // useEffect(() => {
  //   setBetOutcomes(determineBetOutcome(betHistory, gameScores));
  // }, [betHistory, gameScores]);

  const handleAddCredits = async (event) => {
    event.preventDefault();
    await addCredits(250, userId);
    const updatedUserData = await getProfile(userId);
    setCredits(updatedUserData.virtualMoney);
  };

  // async function determineBetOutcome(bets, scores) {
  //   return bets.map((bet) => {
  //     console.log("In determineBetOutcome :", bet)
  //     const game = scores.find((score) => score.id === bet.match);
  //     console.log("game in determine Bet Outcome :", game);
  //     // console.log("game completed in determine Bet Oucome :", game.completed);
  //     if (!game || !game.completed) return { ...bet, outcome: 'pending' };
  //     console.log("After !game || !game.completed :", bet.outcome);
      
  //     const winningTeam = game.scores.reduce((prev, curr) => 
  //       prev.score > curr.score ? prev : curr
  //     ).name;
  //     console.log("Winning Team :", winningTeam);
  //     let finalScore = 0;
  //     game.scores.map((team) => {
  //       console.log(team.score)
  //       finalScore += Number(team.score);
  //       return finalScore
  //     })
  //     console.log("FinalScore :", finalScore)

  //     let outcome = '';

  //     if(bet.betType === "Moneyline") {
  //       outcome = bet.team === winningTeam ? 'win' : 'lose';
  //       console.log("moneyline outcome :", outcome);
  //     }
  //     if(bet.betType === 'O/U') {
  //       if(bet.subtype === 'Over'){
  //         outcome = bet.point < finalScore ? 'win' : 'lose';
  //         console.log("Over outcome :", outcome);
  //       } else if (bet.subtype === "Under") {
  //         outcome = bet.point > finalScore ? 'win' : 'lose';
  //         console.log("Under outcome :", outcome);
  //       }
  //     }
  //     if(bet.betType === 'Spread') {
  //       let selectedTeamScore = 0;
  //       let enemyTeamScore = 0;
  //       game.scores.map((team) => {
  //         if(team.name === bet.team) {
  //           selectedTeamScore = Number(team.score)
  //         } else {
  //           enemyTeamScore = Number(team.score)
  //         }
  //       })
  //       console.log("SelectedTeamScore: ", selectedTeamScore)
  //       console.log("enemyTeamScore: ", enemyTeamScore)
  //       if(bet.point < 0) {
  //         outcome = ((selectedTeamScore-enemyTeamScore) > Math.abs(bet.point)) ? 'win' : 'lose';
  //         console.log("Negative point spread :", outcome);
  //       } else {
  //         outcome = (winningTeam===bet.team || Math.abs(selectedTeamScore-enemyTeamScore)< bet.point) ? 'win' : 'lose';
  //         console.log("Positive point spread :", outcome);
  //       }
  //     }

  //     if (bet.outcome !== outcome) {
  //       console.log("determineBetOutcome bet._id :", bet._id);
  //       await updateBet(userId, bet._id, outcome)
  //     }


  //     return { ...bet, outcome };
  //   });
  // }
  async function determineBetOutcome(bets, scores) {
    const outcomes = await Promise.all(bets.map(async (bet) => {
      console.log("In determineBetOutcome :", bet)
      const game = scores.find((score) => score.id === bet.match);
      console.log("game in determine Bet Outcome :", game);
      if (!game || !game.completed) return { ...bet, outcome: 'pending' };
      console.log("After !game || !game.completed :", bet.outcome);
      
      const winningTeam = game.scores.reduce((prev, curr) => 
        prev.score > curr.score ? prev : curr
      ).name;
      console.log("Winning Team :", winningTeam);
      let finalScore = 0;
      game.scores.map((team) => {
        console.log(team.score)
        finalScore += Number(team.score);
        return finalScore
      })
      console.log("FinalScore :", finalScore)
  
      let outcome = '';
  
      if(bet.betType === "Moneyline") {
        outcome = bet.team === winningTeam ? 'win' : 'lose';
        console.log("moneyline outcome :", outcome);
      }
      if(bet.betType === 'O/U') {
        if(bet.subtype === 'Over'){
          outcome = bet.point < finalScore ? 'win' : 'lose';
          console.log("Over outcome :", outcome);
        } else if (bet.subtype === "Under") {
          outcome = bet.point > finalScore ? 'win' : 'lose';
          console.log("Under outcome :", outcome);
        }
      }
      if(bet.betType === 'Spread') {
        let selectedTeamScore = 0;
        let enemyTeamScore = 0;
        game.scores.map((team) => {
          if(team.name === bet.team) {
            selectedTeamScore = Number(team.score)
          } else {
            enemyTeamScore = Number(team.score)
          }
        })
        console.log("SelectedTeamScore: ", selectedTeamScore)
        console.log("enemyTeamScore: ", enemyTeamScore)
        if(bet.point < 0) {
          outcome = ((selectedTeamScore-enemyTeamScore) > Math.abs(bet.point)) ? 'win' : 'lose';
          console.log("Negative point spread :", outcome);
        } else {
          outcome = (winningTeam===bet.team || Math.abs(selectedTeamScore-enemyTeamScore)< bet.point) ? 'win' : 'lose';
          console.log("Positive point spread :", outcome);
        }
      }
  
      if (bet.outcome !== outcome) {
        console.log("determineBetOutcome bet._id :", bet._id);
        await updateBet(userId, bet._id, outcome)
      }
  
      return { ...bet, outcome };
    }));
  
    return outcomes;
  }

  const updateBetOutcome = async (betId, outcome) => {
    try {
      const response = await axios.patch('http://localhost:8080/api/bet/update-outcome', {
        betId, 
        outcome
      },);
  
      console.log('Bet updated successfully', response.data);
    } catch(error) {
      console.error('Error updating the bet', error);
    }
  }
  

  return (
    <div>
      <div className="gold-container">
        <div className="card wallet">
          <div>
            <img src={Image} className="image" alt="Wallet" />
            <h2>Welcome, {userName}!</h2>
            <h3 className="number-h1">Credits: {credits}</h3>
            <button className="add-credit-button" onClick={handleAddCredits}>Add Credits</button>
          </div>
        </div>
      </div>
      
      <div className="bet-history">
        <h3>Bet History:</h3>
        {betHistory.map((bet, index) => (
          <div key={index}>
            <p>{bet.betType} - {bet.team} : {bet.betValue} ({bet.price})</p>
            <p>Outcome: {bet.outcome}</p>
          </div>
        ))}
      </div>
      
      <div className="scores">
        <h3>Game Scores:</h3>
        {Array.isArray(gameScores) && gameScores.map((game, index) => (
          <div key={index}>
            <p>{game.home_team} vs {game.away_team}</p>
            {Array.isArray(game.scores) && game.scores.map((score, i) => (
              <div key={i}>
                <p>{score.name} : {score.score}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;

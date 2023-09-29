import React, { useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { getProfile } from "../api/users";
import { getSingleBet } from "../api/bet";
import { addCredits } from "../api/users"; 
import { updateBet } from "../api/bet";
import Bet from './Bet.js'
import Image from "../images/bag.png";
import axios from "axios";

function Profile() {
  const {isLoggedIn} = useContext(AuthContext);
  const navigate= useNavigate();
  const [userName, setUserName] = useState("Username");
  const [credits, setCredits] = useState(1000);
  const [betHistory, setBetHistory] = useState([]);
const [gameScores, setGameScores] = useState([]);
  const [betOutcomes, setBetOutcomes] = useState([]);
 
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if(!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

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
  
  async function handleAddCredits(event) {
    event.preventDefault();    
    await addCredits(250,userId)    
  };
  
  return (
    <div>
      <div className="gold-container">
        <div className="card wallet">
          <div>
            {/* <img src={Image} className="image" /> */}
            <h2>Welcome, {userName}!</h2>
            <h3 className="number-h1">Credits: {credits}</h3>
            <form>
               <button className="add-credit-button" onClick={handleAddCredits}> Add Credits</button>
            </form>
          </div>
        </div>
      </div>
      <div className="bet-history">
        <h3>Bet History:</h3>
        {
          betHistory.map((bet, index) => (
            <Bet key={index} bet={bet} />
            
          ))
        }
      </div>
    </div>
  );
}

export default Profile;

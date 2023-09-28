import { addCredits } from "../api/users";
import { useEffect, useState, useContext } from "react";
import { getProfile } from "../api/users"
import { getSingleBet } from "../api/bet";
import Bet from "./Bet";


function Profile() {
  const [userName, setUserName] = useState("Username");
  const [credits, setCredits] = useState(1000);
  const [betHistory, setBetHistory] = useState([]);

 
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    async function grabUserInfo() {
      const userData = await getProfile(userId);
      setUserName(userData.username);
      setCredits(userData.virtualMoney);

      const betHistoryPromises = userData.bets.map(async (betId) => {
        const betData = await getSingleBet(userId, betId);
        console.log("Frontend betData :", betData);
        return betData;
      });

      const betHistory = await Promise.all(betHistoryPromises);
      console.log("betHistory :", betHistory);
      setBetHistory(betHistory);
    }
    grabUserInfo();
  }, []);
  
  console.log("Profile compnent ", userId)
  async function handleAddCredits(event) {
    console.log("handleAddCredits ", event)
    event.preventDefault();
    // Replace with your actual API URL and user ID
    
    await addCredits(250,userId)    
  };
  
  return (
    <div>
      <div className="gold-container">
        <div className="card wallet">
          <div>
            <img src={Image} className="image" />
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
  console.log('added credits')
}

export default Profile;

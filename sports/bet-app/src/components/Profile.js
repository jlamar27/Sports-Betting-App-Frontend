import { useEffect, useState } from "react";
import Image from "../images/bag.png";
import { addCredits } from "../api/users";

function Profile() {
  const [userName, setUserName] = useState("Username");
  const [credits, setCredits] = useState(1000);
  const [betHistory, setBetHistory] = useState([]);
  const userId = localStorage.getItem('userId') // Replace with the actual user id, possibly fetched from state, context, or local storage.

  useEffect(() => {
    // Here you might also want to fetch the initial state of the user from the server.
    setUserName("Username");
    setCredits(1000);
    setBetHistory([]);
  }, []);
  
  console.log("Profile compnent ", userId)
  async function handleAddCredits(event) {
    console.log("handleAddCredits ", event)
    event.preventDefault();
    // Replace with your actual API URL and user ID
    
    await addCredits(250,userId)    
  };
  
  return (
    <form>
      <div className="gold-container">
        <div className="card wallet">
          <div>
            <img src={Image} className="image" />
            <h2>Welcome, {userName}!</h2>
            <h3 className="number-h1">Credits: {credits}</h3>
            <button className="add-credit-button" onClick={handleAddCredits}> Add Credits</button>
          </div>
        </div>
      </div>
      <div className="bet-history">
        <h3>Bet History:</h3>
      </div>
    </form>
  );
  console.log('added credits')
}

export default Profile;

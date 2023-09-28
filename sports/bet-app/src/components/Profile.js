import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image from "../images/bag.png";
// import { getProfile } from "../api/users"


// function Profile() {
// const params = useParams()
// const [profile, setProfile] = useState({})

//   // Fetch user by url param /:handle
//   // useEffect(() => {
//   //   getProfile(params.handle).then(setProfile)
//   // }, [params.handle])

//   // Console log the profile when it changes
//   useEffect(() => {
//     console.log(profile);
//   }, [profile])

//   return (
//     <div>
//       <h1>{profile.username}</h1>
//       <pre>{profile.handle}</pre>
//       <hr />
//     </div>
//   )
// }

function Profile() {
  const [userName, setUserName] = useState("Username");
  const [credits, setCredits] = useState(1000);
  const [betHistory, setBetHistory] = useState([]);

  useEffect(() => {
    setUserName("Username");
    setCredits(1000);
    setBetHistory(0);
  }, []);

  return (
    <form>
      <div className="gold-container">
        <div className="card wallet">
          <div>
            <img src={Image} className="image" />
            <h2>Welcome, {userName}!</h2>
            <h3 className="number-h1">Credits: {credits}</h3>
            <button className="add-credit-button"> Add Credits</button>
          </div>
        </div>
      </div>
      <div className="bet-history">
        <h3>Bet History:</h3>
      </div>
    </form>
  );
}

export default Profile;

import "./Editprofile.css";
import Left from "../../../Components/LeftSide/Left";
import Middle from "./Edit/Middle";
import Right from '../../../Components/RightSide/Right';
import Nav from '../../../Components/Navigation/Nav';
import axios from 'axios';
import { UserContext } from '../../../../context/userContext';
import defprofile from "../../../assets/profile.png";
import { useState, useContext, useEffect } from 'react'

function Editprofile() {
  
  const [userData, setUserData] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePicture, setProfilePicture] = useState(''); // Add profilePicture state
  
  const { user } = useContext(UserContext); // Get user info from context
  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      axios.get(`/getUserprofile?userId=${userId}`)
        .then(response => {
          console.log(response.data); // Log the userData received from the API
          setUserData(response.data);
          setFirstName(response.data.firstName || ''); // Ensure empty string if data is not available
          setLastName(response.data.lastName || '');
          setEmail(response.data.email || ''); // Ensure empty string if data is not available
          setProfilePicture(response.data.profilePicture);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [userId]);


  return (
    <div className="interface">
        <Nav profilePicture={profilePicture} defprofile={defprofile}/>

      <div className="home">
      <Left  firstName={firstName} lastName={lastName} profilePicture={profilePicture} email={email} defprofile={defprofile} />

        <Middle/>

        <Right/>
      </div>
    </div>
  );
}

export default Editprofile;

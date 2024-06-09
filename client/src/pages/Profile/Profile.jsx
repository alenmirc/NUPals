import { useState, useContext, useEffect } from 'react'
import Left from '../../Components/LeftSide/Left'
import ProfileMiddle from '../../Components/Profile/ProfileMiddle'
import Right from '../../Components/RightSide/Right'
import Nav from '../../Components/Navigation/Nav'
import "./Profile.css"
import ProfileImg from "../../assets/profile.png"
import axios from 'axios';
import { UserContext } from '../../../context/userContext';
import defprofile from "../../assets/profile.png";

const Profile = () => {

  const [following,setFollowing] =useState(3)
  const [search,setSearch] =useState("")

  const [showMenu,setShowMenu] =useState(false)

  const [images,setImages] =  useState(null)

  const [name,setName]= useState("")
  const [userName,setUserName]= useState("")
  const [profileImg,setProfileImg] =useState(ProfileImg)

  const [modelDetails,setModelDetails] = useState(
    {
      ModelName:"Dastin Contento",
      ModelUserName:"@contentodv@students.national-u.edu.ph",
      ModelCountryName:"Soduku, Volleyball, and Dancing",
      ModelJobName:"Web Developer in Google"
    }
  )

    
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
    <div className='interface'>
         <Nav profilePicture={profilePicture} defprofile={defprofile}/>

      <div className="home">
        <Left  firstName={firstName} lastName={lastName} profilePicture={profilePicture} email={email} defprofile={defprofile} />

        <ProfileMiddle firstName={firstName} profilePicture={profilePicture} defprofile={defprofile}
        following={following}
        search={search}
        images={images}
        setImages={setImages}
        name={name}
        setName={setName}
        userName={userName}
        setUserName={setUserName}
        profileImg={profileImg}
        setProfileImg={setProfileImg}
        modelDetails={modelDetails}
        setModelDetails={setModelDetails}
        />
        
        <Right 
   
        />
      </div>
    </div>
  )
}

export default Profile
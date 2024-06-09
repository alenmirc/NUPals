import React, { useState, useContext, useEffect } from 'react'
import "../InfoProfile/Info.css"
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import Info3 from "../../../../assets/Info-Dp/img-3.jpg"
import profile from "../../../../assets/profile.png"
import {LiaEdit} from "react-icons/lia"

import {IoCameraOutline} from "react-icons/io5"
import {BiLogOut} from "react-icons/bi"
import { useRef } from 'react';
import ModelProfile from '../ModelProfile/ModelProfile';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../../../context/userContext';
import moment from 'moment';
import axios from 'axios';


const Info = ({userPostData,
              following,
              modelDetails,
              setModelDetails,
              profileImg,
              setProfileImg,
              name,
              setName,
              userName,
              setUserName}) => {

  const { user, logout } = useContext(UserContext);
  const userId = user?.id;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userId) {
      axios.get(`/getUserprofile?userId=${userId}`)
        .then(response => {
          console.log(response.data); // Log the userData received from the API
          setUserData(response.data);

        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [userId]);

  const [coverImg,setCoverImg] =useState(Info3)
  const [openEdit,setOpenEdit] =useState(false)

  const [countryName,setCountryName]= useState("")
  const [jobName,setJobName]= useState("")
  
  const handleModel=(e)=>{
    e.preventDefault()

    const ModelName =name
    const ModelUserName=userName
    const ModelCountryName=countryName
    const ModelJobName = jobName

    let obj={
          ModelName:ModelName,
          ModelUserName:ModelUserName,
          ModelCountryName:ModelCountryName,
          ModelJobName:ModelJobName,
    }

    setModelDetails(obj)
    setOpenEdit(false)
  }


  return (


    <div className='info'>
        <div className="info-cover">
            <img src={coverImg} alt="" />
            {userData && (
            <img src={userData.profilePicture || profile} alt="" />
          )}
        </div>
        {userData && (
        <div className="info-follow">
        
            <h1>{userData.firstName} {userData.lastName}</h1>
            <p>{userData.email}</p>
          
            <button className='logout' onClick={logout} style={{ width: '100px', padding: '5px' }}>
  <BiLogOut />Logout
</button>

<Link to="/editprofile">
  <button><LiaEdit />Edit Profile</button>
</Link>
            <ModelProfile 
            name={name}
            setName={setName}
            userName={userName}
            setUserName={setUserName}
            countryName={countryName}
            setCountryName={setCountryName}
            jobName={jobName}
            setJobName={setJobName}
            handleModel={handleModel}
            openEdit={openEdit}
            setOpenEdit={setOpenEdit}
            />
          

          <div className="info-details">
            <div className="info-col-1">
              <div className="info-details-list">
                <InterestsOutlinedIcon />
                <span>{userData?.skills?.length > 0 ? userData.skills.join(', ') : 'Not Set'}</span>
              </div>

              <div className="info-details-list">
                <SchoolOutlinedIcon />
                <span>{userData?.department || 'Not Set'}</span>
              </div>

              <div className="info-details-list">
                <CalendarMonthRoundedIcon />
                <span>Joined {moment(user.createdAt).format('MMMM YYYY')}</span>
              </div>
            </div>

            <div className="info-col-2">
              <div>
                <h2>0</h2>
                <span>Followers</span>
              </div>
              <div>
                <h2>{userPostData.length}</h2>
                <span>Posts</span>
              </div>
              <div>
                <h2>0</h2>
                <span>Following</span>
              </div>
            </div>

          </div>


        </div>)}
    </div>
    
  )
}

export default Info
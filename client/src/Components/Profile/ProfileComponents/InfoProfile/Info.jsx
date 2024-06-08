import React, { useState, useContext } from 'react'
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
            <img src={profile} alt="" />
          
        </div>
      

        



        <div className="info-follow">
            <h1>{user?.firstName} {user?.lastName}</h1>
            <p>{user?.email}</p>

            <button className='logout' onClick={logout} style={{ width: '100px', padding: '5px' }}>
  <BiLogOut />Logout
</button>

            <button onClick={()=>setOpenEdit(true)}><LiaEdit />Edit Profile</button>
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
                <span>{modelDetails.ModelCountryName}</span>
              </div>

              <div className="info-details-list">
                <SchoolOutlinedIcon />
                <span>{modelDetails.ModelJobName}</span>
              </div>

              <div className="info-details-list">
                <CalendarMonthRoundedIcon />
                <span>Joined in {moment(user.createdAt).format('YYYY-MM-DD')}</span>
              </div>
            </div>

            <div className="info-col-2">
              <div>
                <h2>5,000</h2>
                <span>Followers</span>
              </div>
              <div>
                <h2>{userPostData.length}</h2>
                <span>Posts</span>
              </div>
              <div>
                <h2>{following}</h2>
                <span>Following</span>
              </div>
            </div>

          </div>


        </div>
    </div>
  )
}

export default Info
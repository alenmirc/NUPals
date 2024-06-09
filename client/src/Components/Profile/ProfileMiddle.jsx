import Info from './ProfileComponents/InfoProfile/Info'
import UserHome from '../UserHome/UserHome'

import Profile from "../../assets/profile.png";
import img1 from "../../assets/User-post/img1.jpg"
import img2 from "../../assets/User-post/img2.jpg"
import img3 from "../../assets/User-post/img3.jpg"
import { useEffect, useState } from 'react'
import "../Profile/ProfileMiddle.css"

import moment from 'moment'
import ProfileInputPost from './ProfileComponents/ProfileInputPost'

const ProfileMiddle = ({firstName, profilePicture, defprofile,
                        following,
                        search,
                        images,
                        setImages,
                        profileImg,
                        setProfileImg,
                        name,
                        setName,
                        userName,
                        setUserName,
                        modelDetails,
                        setModelDetails}) => {

  const [userPostData ,setUserPostData] =useState(
    [
      {
        id:1,
        username:"Dastin Contento",
        profilepicture:Profile,
        img:img1,
        datetime:moment("20230615", "YYYYMMDD").fromNow(),
        body:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia illum provident consequuntur reprehenderit tenetur, molestiae quae blanditiis rem placeat! Eligendi, qui quia quibusdam dolore molestiae veniam neque fuga explicabo illum?",
        like: 22,
        comment:12
    },
    {
        id:2,
        username:"Dastin Contento",
        profilepicture:Profile,
        img:img2,
        datetime:moment("20230525", "YYYYMMDD").fromNow(),
        body:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia illum provident consequuntur reprehenderit tenetur, molestiae quae blanditiis rem placeat! Eligendi, qui quia quibusdam dolore molestiae veniam neque fuga explicabo illum?",
        like: 84,
        comment:30
    },
    {
        id:3,
        username:"Dastin Contento",
        profilepicture:Profile,
        img:img3,
        datetime:moment.utc("2023-08-13 12:45:00").local().startOf('seconds').fromNow(),
        body:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia illum provident consequuntur reprehenderit tenetur, molestiae quae blanditiis rem placeat! Eligendi, qui quia quibusdam dolore molestiae veniam neque fuga explicabo illum?",
        like: 340,
        comment:76
    }
    ]
  )

  
 

  

  const [searchResults,setSearchResults] =useState("")
    
    useEffect(()=>{
      const searchData = userPostData.filter((val)=>(
        (val.body.toLowerCase().includes(search.toLowerCase()))
       ||
       (val.username.toLowerCase().includes(search.toLowerCase()))
       ))
       setSearchResults(searchData)
       
    },[userPostData,search])

   

    

  return (
    <div className='profileMiddle'>
        <Info 
        modelDetails ={modelDetails}
        setModelDetails={setModelDetails}
        profileImg={profileImg}
        setProfileImg={setProfileImg}
        userPostData={userPostData}
        following={following}
        name={name}
        setName={setName}
        userName={userName}
        setUserName={setUserName}
        />
        
        <ProfileInputPost firstName={firstName} profilePicture={profilePicture} defprofile={defprofile} />
        
        <UserHome 
        modelDetails={modelDetails}
        profileImg={profileImg}
        setUserPostData={setUserPostData}
        userPostData={searchResults}
        images={images}
        />
    </div>
  )
}

export default ProfileMiddle
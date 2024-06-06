import React, { useEffect, useState } from 'react'
import InputPost from '../Post/InputPost'
import Homepage from "../Home2/Homepage"
import "../MiddleSide/Middle.css"


const Middle = ({
                posts,
                setPosts,
                search,
                images,
                setFriendsProfile
              }) => {
    
  
    const [searchResults,setSearchResults] =useState("")
    
    useEffect(()=>{
      const searchData = posts.filter((val)=>(
        (val.body.toLowerCase().includes(search.toLowerCase()))
       ||
       (val.username.toLowerCase().includes(search.toLowerCase()))
       ))
       setSearchResults(searchData)
       
    },[posts,search])
  
  return (
    <div className='M-features'>
        <InputPost />

        <Homepage 
        posts ={searchResults}
        setPosts={setPosts}
        setFriendsProfile={setFriendsProfile}
        images={images}
        />
    </div>
  )
}

export default Middle
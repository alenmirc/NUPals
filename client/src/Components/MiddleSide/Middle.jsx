
import InputPost from '../Post/InputPost'
import Homepage from "../Home/Homepage"
import "../MiddleSide/Middle.css"


export default function Middle({firstName, profilePicture, defprofile}) {
                
  
  return (
    <div className='M-features'>
        <InputPost firstName={firstName} profilePicture={profilePicture} defprofile={defprofile}/>
        <Homepage  />
    </div>
  
  )
}

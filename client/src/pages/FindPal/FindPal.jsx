import React from 'react';
import UserCard from '../../Components/Usercard/Usercard';
import Nav from '../../Components/Navigation/Nav';


function FindPal() {
  return (
    <>
      <div className="interface">
        <Nav />
      </div>


        
        {/* Added card-container class */}
                <UserCard />
          

        
    </>
  );
}

export default FindPal;

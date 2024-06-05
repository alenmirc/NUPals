import { UserContext } from '../../context/userContext';
import React, { useContext } from 'react';

export default function Dashboard() {
    const { user } = useContext(UserContext);

    return (
        <div>
            <h1> Dashboard</h1>
            {!!user && (<h2>hi {user.firstName}!</h2>)}
        </div>
        
        

        
    )


}
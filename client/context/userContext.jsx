import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({})

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
       if(!user){
        axios.get('/profile').then(({data}) => {
            setUser(data)
        })
       }
}, [])

const logout = () => {
    axios.post('/logout').then(() => {
        setUser(null);
        // Reload the browser to clear any stale data or state
        window.location.reload();
    });
};


    return (
        <UserContext.Provider value={{user, setUser, logout}}>
            {children}    
                </UserContext.Provider>
    )
}
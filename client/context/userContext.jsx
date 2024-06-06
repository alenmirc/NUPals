import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        axios.get('/profile', { withCredentials: true })
            .then(({ data }) => {
                setUser(data);
            })
            .catch((error) => {
                console.error("Error fetching profile data:", error);
            })
            .finally(() => {
                setLoading(false); // Set loading to false when request completes
            });
    }, []);

    const logout = () => {
        axios.post('/logout').then(() => {
            setUser(null);
        });
    };

    
    return (
        <UserContext.Provider value={{ user, setUser, logout, loading }}>
            {children}
        </UserContext.Provider>
    )
}

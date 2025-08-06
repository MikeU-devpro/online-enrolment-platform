import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUserName = localStorage.getItem('user_name');
        const storedUserEmail = localStorage.getItem('user_email');
        const storedToken = localStorage.getItem('jwt_token');

        if (storedUserName && storedUserEmail && storedToken) {
            setUser({
                name: storedUserName,
                email: storedUserEmail,
            });
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
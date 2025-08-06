import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setusername] = useState('');
    const [role, setrole] = useState('');
    const [id, setid] = useState('');

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        const storedusername = localStorage.getItem('username');
        const storedrole = localStorage.getItem('role');
        const storedid = localStorage.getItem('id');

        // Allow login if at least email and role are present
        if (storedEmail && storedrole) {
            setEmail(storedEmail);
            setrole(storedrole);
            setLoggedIn(true);
            if (storedusername) setusername(storedusername);
            if (storedid) setid(storedid);
        }
    }, []);

    const handleLogin = (email, username, role, id) => {
        console.log('Email set in context:', email); // Log the email
        setLoggedIn(true);
        setEmail(email);
        setusername(username);
        setrole(role);
        setid(id); // Store _id in state
        localStorage.setItem('email', email);
        localStorage.setItem('username', username);
        localStorage.setItem('role', role);
        localStorage.setItem('id', id); // Store _id in localStorage
    };




    const handleLogout = () => {
        setLoggedIn(false);
        setEmail('');
        setusername('');
        setrole('');
        localStorage.removeItem('email');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem('id');
        window.location.href = '/login'; // Redirect to homepage
    };

    return (
        <AuthContext.Provider value={{ loggedIn, email, handleLogin, handleLogout, username, role, id }}>
            {children}
        </AuthContext.Provider>
    );
};

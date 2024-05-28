import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get('jwt');
        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                setCurrentUser(decodedToken.user);
            } catch (error) {
                console.error('Token decoding failed:', error);
                setCurrentUser(null);
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json();
            setCurrentUser(data.user);
        } else {
            throw new Error('Login failed');
        }
    };

    const signup = async (email, password) => {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json();
            setCurrentUser(data.user);
        } else {
            throw new Error('Signup failed');
        }
    };

    const logout = async () => {
        Cookies.remove('jwt');
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, signup, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

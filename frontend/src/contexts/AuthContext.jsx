import React, { useState, useContext, useEffect } from "react";
import PropTypes from 'prop-types';

const AuthContext = React.createContext();

export function AuthProvider(props) {
    const [authUser, setAuthUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            setIsLoggedIn(true);
        }
    }, []);

    const login = (authToken) => {
        // setAuthUser(userData);
        setToken(authToken);
        setIsLoggedIn(true);
    };

    const setUser = (userData) => {
        setAuthUser(userData);
    }

    const logout = () => {
        setAuthUser(null);
        setToken(null);
        setIsLoggedIn(false);
        localStorage.removeItem('token');
    };

    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
        login,
        logout,
        setUser
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );

}
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}
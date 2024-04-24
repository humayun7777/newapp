// src/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { PublicClientApplication } from '@azure/msal-browser';

const msalConfig = {
    auth: {
        clientId: "6cec9e80-48f0-4873-9776-076045267714",
        authority: "https://heyhooley.b2clogin.com/heyhooley.onmicrosoft.com/B2C_1_signupsignin",
        redirectUri: window.location.origin,
        knownAuthorities: ["heyhooley.b2clogin.com"]
    }
};

const msalInstance = new PublicClientApplication(msalConfig);

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        msalInstance.handleRedirectPromise().then((response) => {
            if (response) {
                setUser(response.account);
            }
        }).catch((error) => {
            console.error("Errors in handle redirect:", error);
        });

        const accounts = msalInstance.getAllAccounts();
        if (accounts.length > 0) {
            setUser(accounts[0]);
        }
    }, []);

    const login = () => {
        msalInstance.loginRedirect({ scopes: ["openid", "profile"] });
    };

    const logout = () => {
        msalInstance.logout();
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

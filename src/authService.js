import { msalInstance } from './authConfig';

export const login = () => {
    const loginRequest = {
        scopes: ["openid", "profile"]
    };

    msalInstance.loginRedirect(loginRequest);
};

export const logout = () => {
    msalInstance.logout();
};

export const getAccount = () => {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
        return accounts[0];
    }
    return null;
};

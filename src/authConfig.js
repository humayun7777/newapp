import { PublicClientApplication } from '@azure/msal-browser';

export const msalConfig = {
    auth: {
        clientId: "6cec9e80-48f0-4873-9776-076045267714", // Replace with your client ID
        authority: "https://heyhooley.b2clogin.com/heyhooley.onmicrosoft.com/B2C_1_signupsignin", // Replace with your authority URL
        redirectUri: "http://localhost:3000"
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    }
};

// Create an instance of MSAL
export const msalInstance = new PublicClientApplication(msalConfig);

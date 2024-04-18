// Configuration for MSAL
const msalConfig = {
    auth: {
        clientId: "6cec9e80-48f0-4873-9776-076045267714",  // Your Application (client) ID from Azure AD B2C
        authority: "https://heyhooley.b2clogin.com/heyhooley.onmicrosoft.com/B2C_1_signupsignin",  // Correct authority URL
        redirectUri: "https://orange-sky-0e951470f.5.azurestaticapps.net"  // Ensure this matches one of your redirect URIs in Azure AD B2C configuration
    },
    cache: {
        cacheLocation: "sessionStorage",  // Recommended to keep cache in session storage for security reasons
        storeAuthStateInCookie: true  // Useful for maintaining state in browsers that block third-party cookies
    }
};

// Creating an instance of MSAL
const msalInstance = new msal.PublicClientApplication(msalConfig);

// Function to handle user login
function login() {
    msalInstance.loginRedirect({
        scopes: ["openid", "profile"]  // Adjust these scopes according to your requirements
    }).catch(e => {
        console.error('Login Error:', e);
    });
}

// Function to handle user logout
function logout() {
    msalInstance.logout();
}

// Log to console that auth.js has loaded
console.log("auth.js loaded successfully");

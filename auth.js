const msalConfig = {
    auth: {
        clientId: "ae6dbbe0-2a58-4202-8c6a-4505fe284ff4",  // Your Application (client) ID from Azure AD B2C
        authority: "https://heyhooley.b2clogin.com/heyhooley.onmicrosoft.com/B2C_1_signupsignin",  
        redirectUri: "https://heyhooley.com"  // This must match the Azure AD B2C configuration exactly
    },
    cache: {
        cacheLocation: "sessionStorage",  // Recommended to keep cache in session storage for security reasons
        storeAuthStateInCookie: true  // Useful for maintaining state in browsers that block third-party cookies
    }
};

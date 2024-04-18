const msalConfig = {
    auth: {
        clientId: "6cec9e80-48f0-4873-9776-076045267714",  // Your Application (client) ID from Azure AD B2C
        authority: "https://heyhooley.b2clogin.com/heyhooley.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_signupsignin&client_id=6cec9e80-48f0-4873-9776-076045267714&nonce=defaultNonce&redirect_uri=https%3A%2F%2Forange-sky-0e951470f.5.azurestaticapps.net&scope=openid&response_type=code&prompt=login",  
        redirectUri: "https://orange-sky-0e951470f.5.azurestaticapps.net"  // This must match the Azure AD B2C configuration exactly
    },
    cache: {
        cacheLocation: "sessionStorage",  // Recommended to keep cache in session storage for security reasons
        storeAuthStateInCookie: true  // Useful for maintaining state in browsers that block third-party cookies
    }
};

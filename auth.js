const msalConfig = {
    auth: {
        clientId: "6cec9e80-48f0-4873-9776-076045267714",
        authority: "https://heyhooley.b2clogin.com/heyhooley.onmicrosoft.com/B2C_1_signupsignin",
        knownAuthorities: ["heyhooley.b2clogin.com"], // Add this line
        redirectUri: "https://orange-sky-0e951470f.5.azurestaticapps.net"
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true
    }
};


// Creating an instance of MSAL
const msalInstance = new msal.PublicClientApplication(msalConfig);

function login() {
    msalInstance.loginRedirect({
        scopes: ["openid"]  // Only request the scopes you need; "openid" is usually sufficient for authenticating and getting basic user info.
    }).catch(e => {
        console.error("Login Error:", e);
    });
}

function logout() {
    msalInstance.logout();
}


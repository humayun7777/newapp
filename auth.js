// MSAL configuration object
const msalConfig = {
    auth: {
        clientId: "6cec9e80-48f0-4873-9776-076045267714",
        authority: "https://heyhooley.b2clogin.com/heyhooley.onmicrosoft.com/B2C_1_signupsignin",
        redirectUri: "https://orange-sky-0e951470f.5.azurestaticapps.net",
        knownAuthorities: ["heyhooley.b2clogin.com"]  // Specify your B2C login domain as a known authority
    },
    cache: {
        cacheLocation: "sessionStorage",  // MSAL will use the browser's session storage
        storeAuthStateInCookie: true  // Necessary for some browsers to maintain state across redirects
    }
};

// Create an instance of MSAL.PublicClientApplication with the configuration
const msalInstance = new msal.PublicClientApplication(msalConfig);

// Handle redirect promise needed to process responses from the authentication server
msalInstance.handleRedirectPromise()
    .then(response => {
        if (response) {
            console.log("Redirect response received, user logged in:", response);
        } else {
            console.log("No redirect response, user not logged in.");
        }
    })
    .catch(err => {
        console.error("Error processing redirect:", err);
    });

// Function to initiate the login process using a redirect
function login() {
    msalInstance.loginRedirect({
        scopes: ["openid", "profile"]  // Adjust these scopes according to your needs
    }).catch(e => {
        console.error("Login Error:", e);
    });
}

// Function to log out the user
function logout() {
    msalInstance.logout();
}

// Function to manually clear MSAL cache if needed
function clearMsalCache() {
    sessionStorage.clear();  // Clear all session storage (be cautious with this in a production environment)
    console.log("Session storage cleared.");
}

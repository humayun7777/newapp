// MSAL configuration object
const msalConfig = {
    auth: {
        clientId: "6cec9e80-48f0-4873-9776-076045267714", // Your Application (client) ID from Azure AD B2C
        authority: "https://heyhooley.b2clogin.com/heyhooley.onmicrosoft.com/B2C_1_signupsignin", // Authority URL
        redirectUri: "https://orange-sky-0e951470f.5.azurestaticapps.net", // Redirect URI configured in Azure AD B2C
        knownAuthorities: ["heyhooley.b2clogin.com"], // Specify your B2C login domain as a known authority
    },
    cache: {
        cacheLocation: "sessionStorage", // Store tokens in sessionStorage
        storeAuthStateInCookie: true, // Use cookies to store session state for stability across page refreshes
    },
    system: {
        loggerOptions: {
            loggerCallback(logLevel, message, containsPii) {
                console.log(message);
            },
            logLevel: msal.LogLevel.Verbose,
        }
    }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);
let isInteractionInProgress = false;

msalInstance.handleRedirectPromise()
    .then((response) => {
        if (response) {
            console.log("Authentication response received", response);
            updateUI(response.account);
        } else {
            checkAccount();
        }
    })
    .catch(err => {
        console.error("Error handling redirect:", err);
        isInteractionInProgress = false;
    });

function checkAccount() {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length === 0) {
        console.log("No user signed in.");
        msalInstance.loginRedirect();
    } else {
        console.log("User already logged in.", accounts[0]);
        updateUI(accounts[0]);
    }
}

function updateUI(account) {
    if (account) {
        document.getElementById('loginButton').style.display = 'none';
        document.getElementById('logoutButton').style.display = 'block';
        document.getElementById('userInfo').innerText = `Welcome, ${account.name}`;
    } else {
        document.getElementById('loginButton').style.display = 'block';
        document.getElementById('logoutButton').style.display = 'none';
        document.getElementById('userInfo').innerText = 'Please log in';
    }
}

function login() {
    if (!isInteractionInProgress) {
        isInteractionInProgress = true;
        msalInstance.loginRedirect({
            scopes: ["openid", "profile"]
        }).finally(() => {
            isInteractionInProgress = false;
        });
    }
}

function logout() {
    if (!isInteractionInProgress) {
        isInteractionInProgress = true;
        msalInstance.logout().finally(() => {
            isInteractionInProgress = false;
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    if (!msalInstance.getAllAccounts().length) {
        msalInstance.loginRedirect();
    }
});

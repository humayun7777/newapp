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
    }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

let interactionInProgress = false;

function handleResponse(response) {
    interactionInProgress = false;
    if (response !== null) {
        console.log("Authentication response received", response);
        updateUI(response.account);
    } else {
        const currentAccount = msalInstance.getAllAccounts()[0];
        if (currentAccount) {
            console.log("User already logged in.", currentAccount);
            updateUI(currentAccount);
        } else {
            updateUI(null);
        }
    }
}

function updateUI(account) {
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');
    const userInfo = document.getElementById('userInfo');

    if (account) {
        loginButton.style.display = 'none';
        logoutButton.style.display = 'block';
        userInfo.innerText = `Welcome, ${account.name}`;
    } else {
        loginButton.style.display = 'block';
        logoutButton.style.display = 'none';
        userInfo.innerText = 'Please log in';
    }
}

function login() {
    if (!interactionInProgress) {
        interactionInProgress = true;
        msalInstance.loginRedirect({
            scopes: ["openid", "profile"]
        }).catch(err => {
            console.error("Login Error:", err);
            interactionInProgress = false;
        });
    }
}

function logout() {
    if (!interactionInProgress) {
        interactionInProgress = true;
        msalInstance.logout().catch(err => {
            console.error("Logout Error:", err);
            interactionInProgress = false;
        });
    }
}

msalInstance.handleRedirectPromise()
    .then(handleResponse)
    .catch(err => {
        console.error("Error handling redirect:", err);
        interactionInProgress = false;
    });

document.addEventListener('DOMContentLoaded', function () {
    handleResponse(null);
});

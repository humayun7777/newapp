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

// Create an instance of PublicClientApplication with the configuration
const msalInstance = new msal.PublicClientApplication(msalConfig);

// Handle authentication responses from MSAL
function handleResponse(response) {
    if (response !== null) {
        // Handle the response from a completed authentication
        console.log("Authentication response received", response);
        updateUI(response.account);
    } else {
        // No response from authentication, check current account
        const currentAccount = msalInstance.getAllAccounts()[0];
        if (currentAccount) {
            console.log("User already logged in.", currentAccount);
            updateUI(currentAccount);
        }
    }
}

// Update the UI based on the current account
function updateUI(account) {
    if (account) {
        document.getElementById('loginButton').style.display = 'none';
        document.getElementById('logoutButton').style.display = 'block';
        document.getElementById('userInfo').innerText = `Welcome, ${account.name}`;
    } else {
        document.getElementById('loginButton').style.display = 'block';
        document.getElementById('logoutButton').style.display = 'none';
        document.getElementById('userInfo').innerText = '';
    }
}

// Function to initiate the login process using a redirect
function login() {
    msalInstance.loginRedirect({
        scopes: ["openid", "profile"] // Request permissions to access user profile
    });
}

// Function to log the user out
function logout() {
    msalInstance.logout();
}

// Register callback for handling the response when the page loads after redirect
msalInstance.handleRedirectPromise()
    .then(handleResponse)
    .catch(err => {
        console.error("Error handling redirect:", err);
    });

document.addEventListener('DOMContentLoaded', function () {
    // Call handleResponse at load to ensure any returning authentication processes are handled
    handleResponse(null);
});

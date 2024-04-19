// Configuration for MSAL
const msalConfig = {
    auth: {
        clientId: "6cec9e80-48f0-4873-9776-076045267714", // Your Application (client) ID from Azure AD B2C
        authority: "https://heyhooley.b2clogin.com/heyhooley.onmicrosoft.com/B2C_1_signupsignin", // Authority URL
        redirectUri: "https://orange-sky-0e951470f.5.azurestaticapps.net", // Redirect URI configured in Azure AD B2C
        knownAuthorities: ["heyhooley.b2clogin.com"], // Add your Azure AD B2C domain to the known authorities
    },
    cache: {
        cacheLocation: "sessionStorage", // Store tokens in sessionStorage
        storeAuthStateInCookie: true, // Use cookies to store session state for stability across page refreshes
    }
};

// Create an instance of PublicClientApplication with the configuration
const msalInstance = new msal.PublicClientApplication(msalConfig);

// Function to handle response from authentication redirect
function handleResponse(response) {
    if (response !== null) {
        console.log("Authenticated successfully!", response);
        updateUI();
    } else {
        console.log("Not authenticated. User may need to log in.");
        checkAccount();
    }
}

// Check whether the user is already logged in
function checkAccount() {
    const currentAccounts = msalInstance.getAllAccounts();
    if (currentAccounts.length === 1) {
        console.log("User already logged in:", currentAccounts[0]);
        updateUI();
    }
}

// Login function to initiate the login process
function login() {
    msalInstance.loginRedirect({
        scopes: ["openid", "profile"] // Request permissions to access user profile
    });
}

// Logout function to log the user out
function logout() {
    msalInstance.logout();
}

// Function to update the UI based on user's login status
function updateUI() {
    const currentAccounts = msalInstance.getAllAccounts();
    if (currentAccounts.length === 1) {
        document.getElementById('loginButton').style.display = 'none';
        document.getElementById('logoutButton').style.display = 'block';
        document.getElementById('userInfo').innerText = `Welcome, ${currentAccounts[0].name}`;
    } else {
        document.getElementById('loginButton').style.display = 'block';
        document.getElementById('logoutButton').style.display = 'none';
        document.getElementById('userInfo').innerText = '';
    }
}

// Register callbacks for handling the response
msalInstance.handleRedirectPromise().then(handleResponse).catch(err => {
    console.error("Error handling redirect:", err);
});

document.addEventListener('DOMContentLoaded', function () {
    checkAccount(); // Check login state as soon as the script loads
});

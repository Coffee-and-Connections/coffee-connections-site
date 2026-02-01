/* COFFEE & CONNECTIONS WEBSITE CONFIGURATION */

// DETECT ENVIRONMENT
// If you are testing the website locally, talk to the local Vault (Port 6000)
// If the website is live, talk to the Live Vault (Render URL)
const IS_LOCAL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// POINT TO THE APP REPOSITORY'S SERVERS
const VAULT_BASE = IS_LOCAL 
    ? 'http://localhost:6000' 
    : 'https://strong-bonds-vault.onrender.com'; // <--- THIS IS THE APP'S SERVER

const CONFIG = {
    endpoints: {
        submitStory: `${VAULT_BASE}/api/vault/stories`,
        getStories: `${VAULT_BASE}/api/vault/stories`
    }
};

/* COFFEE & CONNECTIONS | CENTRAL CONFIGURATION
   Mission: Directs website traffic to the correct API Towers.
*/

// 1. DETECT ENVIRONMENT (Are we on Laptop or Internet?)
const IS_LOCAL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// 2. DEFINE THE TOWERS (The URLs)
const API_URLS = {
    // TOWER 1: THE VAULT (Secure / HIPAA)
    // Handles: Survivor Stories, Crisis Resources
    VAULT: IS_LOCAL 
        ? 'http://localhost:6000' 
        : 'https://strong-bonds-vault.onrender.com',

    // TOWER 2: PUBLIC COMMERCIAL (Coffee Shop)
    // Handles: Menu, Gamification, User Login
    PUBLIC: IS_LOCAL 
        ? 'http://localhost:5000' 
        : 'https://ccep-public-api.onrender.com'
};

// 3. EXPORT ENDPOINTS (The specific doors we knock on)
const CONFIG = {
    endpoints: {
        // Secure Routes
        submitStory: `${API_URLS.VAULT}/api/vault/stories`,
        getStories: `${API_URLS.VAULT}/api/vault/stories`,
        
        // Commercial Routes
        getMenu: `${API_URLS.PUBLIC}/api/menu`,
        login: `${API_URLS.PUBLIC}/api/login`,
        gamification: `${API_URLS.PUBLIC}/api/badges`
    }
};

// Console Log to verify connection (visible in browser F12)
console.log(`[CONFIG] System Mode: ${IS_LOCAL ? 'LOCAL (Laptop)' : 'LIVE (Cloud)'}`);
console.log(`[CONFIG] Connected to Public Tower: ${API_URLS.PUBLIC}`);
console.log(`[CONFIG] Connected to Vault Tower: ${API_URLS.VAULT}`);

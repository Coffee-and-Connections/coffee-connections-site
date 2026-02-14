/* =========================================
   JOURNAL-LOGIC.JS (The Bunkered Version)
   Mission: Fetch and display survivor stories from the Secure Vault.
   ========================================= */

// Use the Central Configuration instead of a hardcoded string
const VAULT_ENDPOINT = CONFIG.endpoints.getStories;

async function loadStories() {
    // Ensure we have access to the display element
    const storyDisplay = document.getElementById('story-display'); 
    
    try {
        // 1. High-Contrast Loading State
        storyDisplay.innerHTML = `<p class="loading-state">Accessing the Vault...</p>`;
        
        // 2. Execute the Handshake
        const response = await fetch(VAULT_ENDPOINT, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        // 3. Handle the Response
        if (!response.ok) {
            throw new Error(`Vault Door Jammed: ${response.status}`);
        }

        // 4. Parse the Data
        const stories = await response.json();

        // 5. Display Logic
        if (stories && stories.length > 0) {
            // We use the global 'stories' variable expected by your display functions
            window.stories = stories; 
            displayStory(0); // This assumes displayStory() is defined elsewhere in your JS
        } else {
            storyDisplay.innerHTML = `<p class="loading-state">The vault is resting.</p>`;
        }

    } catch (error) {
        console.error("[VAULT ERROR]", error);
        
        // 6. Security/Error UI
        storyDisplay.innerHTML = `
            <div class="story-content">
                <p class="error-text" style="color:#b71c1c; font-weight:800;">
                    Secure Connection Lost.<br>
                    <span style="font-size: 0.8rem; font-weight:400; color:#333;">
                        The bunker is secure, but the link is unstable. Please refresh.
                    </span>
                </p>
            </div>`;
    }
}

/** * NOTE: Ensure your displayStory function uses .message to match 
 * the MongoDB field name we verified.
 * Example: const content = stories[index].message;
 */
}

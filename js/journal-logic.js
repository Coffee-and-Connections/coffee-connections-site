/* =========================================
   JOURNAL-LOGIC.JS (The Bunkered Version)
   ========================================= */
const VAULT_ENDPOINT = "https://strong-bonds-vault.onrender.com/api/vault/stories";

async function loadStories() {
    try {
        // High-Contrast Loading State
        storyDisplay.innerHTML = `<p class="loading-state">Accessing the Vault...</p>`;
        
        // Use a clean fetch with explicit headers
        const response = await fetch(VAULT_ENDPOINT, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            // If /api/vault/stories fails, try the fallback root path
            console.warn("Primary path failed, trying fallback...");
            const fallbackResponse = await fetch("https://strong-bonds-vault.onrender.com/api/stories");
            if (!fallbackResponse.ok) throw new Error('Vault Door Jammed');
            stories = await fallbackResponse.json();
        } else {
            stories = await response.json();
        }

        if (stories && stories.length > 0) {
            displayStory(0);
        } else {
            storyDisplay.innerHTML = `<p class="loading-state">The vault is resting.</p>`;
        }
    } catch (error) {
        // If everything fails, show the error we see in the screenshot
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

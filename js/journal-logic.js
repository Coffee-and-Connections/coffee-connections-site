/* =========================================
   JOURNAL-LOGIC.JS (The Bunkered Version)
   Mission: Fetch narratives from the Vault and handle navigation.
   ========================================= */

// 1. Connection & State
const VAULT_ENDPOINT = CONFIG.endpoints.getStories;
let currentStoryIndex = 0;

/**
 * FETCH MISSION
 * Reaches out to the Vault Tower to pull approved stories.
 */
async function loadStories() {
    const storyDisplay = document.getElementById('story-display');
    
    try {
        storyDisplay.innerHTML = `<p class="loading-state">Accessing the Vault...</p>`;
        
        const response = await fetch(VAULT_ENDPOINT, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) throw new Error(`Vault Door Jammed: ${response.status}`);

        const storiesData = await response.json();

        if (storiesData && storiesData.length > 0) {
            // Attach data to window so it's accessible across the whole script
            window.stories = storiesData; 
            displayStory(0); 
        } else {
            storyDisplay.innerHTML = `<p class="loading-state">The vault is resting.</p>`;
        }
    } catch (error) {
        console.error("[VAULT ERROR]", error);
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

/**
 * DISPLAY LOGIC
 * Renders a specific story based on the index provided.
 */
function displayStory(index) {
    const storyDisplay = document.getElementById('story-display');
    
    // Safety check: ensure stories exist and index is valid
    if (!window.stories || !window.stories[index]) return;

    // Sync the "Bookmark"
    currentStoryIndex = index;
    const story = window.stories[index];

    // Render to the high-contrast UI
    storyDisplay.innerHTML = `
        <div class="active-story">
            <p class="story-text">"${story.message}"</p>
            <span class="story-meta">— ${story.alias || 'Anonymous'}</span>
        </div>
    `;
}

/**
 * NAVIGATION LOGIC
 * Moves through the stories and loops back at the ends.
 */
function nextStory() {
    if (window.stories && currentStoryIndex < window.stories.length - 1) {
        displayStory(currentStoryIndex + 1);
    } else {
        displayStory(0); // Loop to start
    }
}

function prevStory() {
    if (window.stories && currentStoryIndex > 0) {
        displayStory(currentStoryIndex - 1);
    } else {
        displayStory(window.stories.length - 1); // Loop to end
    }
}

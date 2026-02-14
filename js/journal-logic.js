/* =========================================
   JOURNAL-LOGIC.JS (The Bunkered Version)
   ========================================= */
const VAULT_ENDPOINT = CONFIG.endpoints.getStories;

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

function displayStory(index) {
    const storyDisplay = document.getElementById('story-display');
    if (!window.stories || !window.stories[index]) return;

    const story = window.stories[index];
    storyDisplay.innerHTML = `
        <div class="active-story">
            <p class="story-text">"${story.message}"</p>
            <span class="story-meta">— ${story.alias || 'Anonymous'}</span>
        </div>
    `;
}

// Tracker for the current story being viewed
let currentStoryIndex = 0;

function displayStory(index) {
    const storyDisplay = document.getElementById('story-display');
    // Safety check: Ensure stories exist and the index is valid
    if (!window.stories || !window.stories[index]) return;

    currentStoryIndex = index;
    const story = window.stories[index];

    // Map the data to the high-contrast UI
    storyDisplay.innerHTML = `
        <div class="active-story">
            <p class="story-text">"${story.message}"</p>
            <span class="story-meta">— ${story.alias || 'Anonymous'}</span>
        </div>
    `;
}

// THE BUTTON LOGIC
function nextStory() {
    if (window.stories && currentStoryIndex < window.stories.length - 1) {
        displayStory(currentStoryIndex + 1);
    } else {
        // Optional: Loop back to the first story
        displayStory(0);
    }
}

function prevStory() {
    if (window.stories && currentStoryIndex > 0) {
        displayStory(currentStoryIndex - 1);
    } else {
        // Optional: Loop to the last story
        displayStory(window.stories.length - 1);
    }
}

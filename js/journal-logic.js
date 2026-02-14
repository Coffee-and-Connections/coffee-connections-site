/* =========================================
   JOURNAL-LOGIC.JS
   The Digital Archive Engine
   Mission: Render narratives and advocacy ribbons.
   ========================================= */

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
            window.stories = storiesData; 
            displayStory(0); 
        } else {
            storyDisplay.innerHTML = `<p class="loading-state">The vault is resting.</p>`;
        }
    } catch (error) {
        console.error("[VAULT ERROR]", error);
        storyDisplay.innerHTML = `<p class="error-text">Secure Connection Lost. Please refresh.</p>`;
    }
}

/**
 * DISPLAY LOGIC
 * Renders a specific story and its identifying advocacy ribbons.
 */
function displayStory(index) {
    const storyDisplay = document.getElementById('story-display');
    if (!window.stories || !window.stories[index]) return;

    currentStoryIndex = index;
    const story = window.stories[index];

    // THE COMMUNITY RIBBON LOGIC
    // Maps shorthand codes to their specific advocacy colors
    const tagHTML = (story.tags || []).map(tag => {
        let color = "#888"; // Default Grey
        if(tag === "DV")    color = "#800080"; // Purple
        if(tag === "SA")    color = "#008080"; // Teal
        if(tag === "MH")    color = "#00FF00"; // Green
        if(tag === "SUI")   color = "#0000FF"; // Blue
        if(tag === "MIL")   color = "#ffd700"; // Gold
        if(tag === "ACE")   color = "#ff69b4"; // Pink
        if(tag === "SYS")   color = "#ff8c00"; // Orange
        if(tag === "LGBTQ") color = "#4B0082"; // Indigo

        return `<span class="ribbon-tag" style="border-color:${color}; color:${color}; margin-right: 8px;">#${tag}</span>`;
    }).join('');

    // Render the Final Page
    storyDisplay.innerHTML = `
        <div class="active-story">
            <div class="community-ribbon" style="margin-bottom: 1.5rem; display: flex; flex-wrap: wrap; gap: 8px;">
                ${tagHTML}
            </div>
            <p class="story-text" style="font-size: 1.3rem; line-height: 1.8;">"${story.message}"</p>
            <span class="story-meta" style="display: block; margin-top: 2rem; font-style: italic; font-weight: 700;">
                — ${story.alias || 'Anonymous'}
            </span>
        </div>
    `;
}

/**
 * NAVIGATION LOGIC
 */
function nextStory() {
    if (window.stories && currentStoryIndex < window.stories.length - 1) {
        displayStory(currentStoryIndex + 1);
    } else {
        displayStory(0); 
    }
}

function prevStory() {
    if (window.stories && currentStoryIndex > 0) {
        displayStory(currentStoryIndex - 1);
    } else {
        displayStory(window.stories.length - 1);
    }
}

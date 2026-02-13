/* =========================================
   JOURNAL-LOGIC.JS
   The Engine for "Healing in Motion"
   ========================================= */

let currentStoryIndex = 0;
let stories = [];

const storyDisplay = document.getElementById('story-display');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// 1. THE HANDSHAKE (Linking to Render)
const VAULT_ENDPOINT = "https://strong-bonds-vault.onrender.com/api/stories";

async function loadStories() {
    try {
        // High-Contrast Loading State
        storyDisplay.innerHTML = "<p class='loading-state'>Opening the secure vault...</p>";
        
        const response = await fetch(VAULT_ENDPOINT);
        
        if (!response.ok) {
            throw new Error('Vault is temporarily suspended.');
        }

        stories = await response.json();

        if (stories && stories.length > 0) {
            displayStory(0);
        } else {
            storyDisplay.innerHTML = `
                <div class="story-content">
                    <p class="loading-state">The vault is resting. We are currently vetting new narratives of resilience. Check back shortly.</p>
                </div>`;
        }
    } catch (error) {
        console.error("Vault Connection Error:", error);
        storyDisplay.innerHTML = `
            <div class="story-content">
                <p class="error-text" style="color:#b71c1c; font-weight:800;">
                    Secure Connection Lost.<br>
                    <span style="font-size: 0.9rem; font-weight:400;">Our advocates are working to restore the link. Please refresh.</span>
                </p>
            </div>`;
    }
}

// 2. DISPLAY THE STORY (High-Contrast "Latte" Rendering)
function displayStory(index) {
    const story = stories[index];
    
    // Smooth transition
    storyDisplay.style.opacity = 0;
    
    setTimeout(() => {
        // Using the text/content field from your MongoDB collection
        const narrativeText = story.text || story.content || "Narrative content missing.";
        const narrativeTitle = story.title || "Vetted Narrative";
        
        storyDisplay.innerHTML = `
            <div class="story-content fadeIn">
                <h2 style="color:var(--coffee-accent); margin-bottom:1rem;">${narrativeTitle}</h2>
                <p style="font-size:1.3rem; line-height:1.8; color:var(--text-dark);">"${narrativeText}"</p>
                <cite style="display:block; margin-top:20px; font-weight:700; color:#6a4a3a;">
                    — Received ${new Date(story.timestamp || Date.now()).toLocaleDateString()}
                </cite>
            </div>
        `;
        storyDisplay.style.opacity = 1;
        updateButtons();
    }, 300);
}

// 3. NAVIGATION LOGIC
function updateButtons() {
    // We use visibility instead of disabled to keep the "Look" consistent
    prevBtn.style.opacity = (currentStoryIndex === 0) ? "0.3" : "1";
    prevBtn.style.pointerEvents = (currentStoryIndex === 0) ? "none" : "auto";
    
    nextBtn.style.opacity = (currentStoryIndex === stories.length - 1) ? "0.3" : "1";
    nextBtn.style.pointerEvents = (currentStoryIndex === stories.length - 1) ? "none" : "auto";
}

prevBtn.addEventListener('click', () => {
    if (currentStoryIndex > 0) {
        currentStoryIndex--;
        displayStory(currentStoryIndex);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentStoryIndex < stories.length - 1) {
        currentStoryIndex++;
        displayStory(currentStoryIndex);
    }
});

// INITIALIZE
document.addEventListener('DOMContentLoaded', loadStories);

/* =========================================
   JOURNAL-LOGIC.JS
   The Persistent Engine for "Healing in Motion"
   ========================================= */

let currentStoryIndex = 0;
let stories = [];
let retryCount = 0;
const maxRetries = 3;

const storyDisplay = document.getElementById('story-display');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

const VAULT_ENDPOINT = "https://strong-bonds-vault.onrender.com/api/stories";

async function loadStories() {
    try {
        // High-Contrast Loading State with helpful context
        storyDisplay.innerHTML = `
            <div class="loading-state">
                <p>Opening the secure vault...</p>
                ${retryCount > 0 ? `<p style="font-size:0.9rem; margin-top:10px;">The vault is waking up (Attempt ${retryCount}/${maxRetries}). Please stay with us.</p>` : ''}
            </div>`;
        
        const response = await fetch(VAULT_ENDPOINT);
        
        if (!response.ok) {
            throw new Error('Vault is waking up.');
        }

        stories = await response.json();

        if (stories && stories.length > 0) {
            displayStory(0);
        } else {
            storyDisplay.innerHTML = `
                <div class="story-content">
                    <p class="loading-state">The vault is resting. We are currently vetting new narratives of resilience.</p>
                </div>`;
        }
    } catch (error) {
        console.error("Vault Connection Attempt failed:", error);
        
        if (retryCount < maxRetries) {
            retryCount++;
            // Wait 5 seconds for Render to spin up before retrying
            setTimeout(loadStories, 5000); 
        } else {
            storyDisplay.innerHTML = `
                <div class="story-content">
                    <p class="error-text" style="color:#b71c1c; font-weight:800;">
                        Secure Connection Timeout.<br>
                        <span style="font-size: 0.9rem; font-weight:400; color:var(--text-dark);">
                            The vault is taking longer than usual to open. Please try refreshing the page in 30 seconds.
                        </span>
                    </p>
                </div>`;
        }
    }
}

function displayStory(index) {
    const story = stories[index];
    storyDisplay.style.opacity = 0;
    
    setTimeout(() => {
        const narrativeText = story.text || story.content || "Narrative content missing.";
        const narrativeTitle = story.title || "Vetted Narrative";
        
        storyDisplay.innerHTML = `
            <div class="story-content fadeIn">
                <h2 style="color:var(--coffee-accent); margin-bottom:1rem; font-family:var(--font-heading);">${narrativeTitle}</h2>
                <p style="font-size:1.3rem; line-height:1.8; color:var(--text-dark); font-family:var(--font-body);">"${narrativeText}"</p>
                <cite style="display:block; margin-top:20px; font-weight:700; color:#6a4a3a;">
                    — Received ${new Date(story.timestamp || Date.now()).toLocaleDateString()}
                </cite>
            </div>
        `;
        storyDisplay.style.opacity = 1;
        updateButtons();
    }, 300);
}

function updateButtons() {
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

document.addEventListener('DOMContentLoaded', loadStories);

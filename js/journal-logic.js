/* =========================================
   JOURNAL-LOGIC.JS
   The Engine for "Healing in Motion"
   ========================================= */

let currentStoryIndex = 0;
let stories = [];

const storyDisplay = document.getElementById('story-display');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// 1. FETCH STORIES FROM THE VAULT
async function loadStories() {
    try {
        // We use the URL defined in your config.js
        const response = await fetch(CONFIG.endpoints.getStories);
        stories = await response.json();

        if (stories.length > 0) {
            displayStory(0);
        } else {
            storyDisplay.innerHTML = "<p class='loading-state'>The vault is currently resting. Check back soon.</p>";
        }
    } catch (error) {
        console.error("Vault Connection Error:", error);
        storyDisplay.innerHTML = "<p class='loading-state'>Secure Connection Lost. Please refresh.</p>";
    }
}

// 2. DISPLAY THE STORY
function displayStory(index) {
    const story = stories[index];
    
    // Smooth transition effect
    storyDisplay.style.opacity = 0;
    
    setTimeout(() => {
        storyDisplay.innerHTML = `
            <div class="story-content">
                <p>"${story.text}"</p>
                <cite>— Shared via Secure Vault</cite>
            </div>
        `;
        storyDisplay.style.opacity = 1;
        updateButtons();
    }, 300);
}

// 3. BUTTON LOGIC (The Page Turners)
function updateButtons() {
    prevBtn.disabled = (currentStoryIndex === 0);
    nextBtn.disabled = (currentStoryIndex === stories.length - 1);
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

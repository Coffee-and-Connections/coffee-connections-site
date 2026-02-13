/* =========================================
   VAULT-SUBMIT.JS
   The Secure Entryway for Survivor Stories
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    const storyForm = document.getElementById('story-form');
    const statusMessage = document.getElementById('submission-status');

    if (storyForm) {
        storyForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // 1. Gather Data
            const storyText = document.getElementById('story-input').value;
            
            // 2. Visual Feedback for "Trauma-Informed" UX
            statusMessage.innerHTML = "Encrypting and sending to the Vault...";
            statusMessage.style.color = "var(--coffee-accent)";

            try {
                // Using the door defined in your config.js
                const response = await fetch(CONFIG.endpoints.submitStory, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        text: storyText,
                        timestamp: new Date().toISOString(),
                        status: 'pending' // Every story must be vetted by Tony/Marylou
                    })
                });

                if (response.ok) {
                    statusMessage.innerHTML = "✔ Your story has been safely received. Thank you for your courage.";
                    statusMessage.style.color = "#a370f7";
                    storyForm.reset();
                } else {
                    throw new Error('Vault is temporarily locked.');
                }
            } catch (error) {
                console.error("Vault Error:", error);
                statusMessage.innerHTML = "⚠️ Connection error. Please try again or contact us directly.";
                statusMessage.style.color = "#ffc107";
            }
        });
    }
});

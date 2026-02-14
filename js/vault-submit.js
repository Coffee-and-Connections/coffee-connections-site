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
            // Check if you have an alias input; if not, it defaults to 'Anonymous'
            const aliasInput = document.getElementById('alias-input')?.value || "Anonymous";
            
            // 2. Visual Feedback
            statusMessage.innerHTML = "Encrypting and sending to the Vault...";
            statusMessage.style.color = "var(--coffee-accent)";

            try {
                // 3. The Handshake
                const response = await fetch(CONFIG.endpoints.submitStory, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        alias: aliasInput,     // Matches your Model field
                        message: storyText,    // CHANGED from 'text' to 'message' to match Model
                        submittedAt: new Date().toISOString() // Matches Model field
                    })
                });

                if (response.ok) {
                    statusMessage.innerHTML = "✔ Your story has been safely received. Thank you for your courage.";
                    statusMessage.style.color = "#a370f7";
                    storyForm.reset();
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Vault is temporarily locked.');
                }
            } catch (error) {
                console.error("Vault Submission Error:", error);
                statusMessage.innerHTML = "⚠️ Connection error. Please try again or contact us directly.";
                statusMessage.style.color = "#ffc107";
            }
        });
    }
});

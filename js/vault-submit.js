/* =========================================
   VAULT-SUBMIT.JS
   The Secure Entryway for Survivor Stories
   Mission: Capture Narratives + Identity Tags
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    // Note: Ensure your HTML form ID is 'vault-form'
    const storyForm = document.getElementById('vault-form');
    const statusMessage = document.getElementById('submission-status');
    const tagChips = document.querySelectorAll('.tag-chip');

    // 1. HANDLE TAG SELECTION (The Multi-Select Logic)
    tagChips.forEach(chip => {
        chip.addEventListener('click', () => {
            chip.classList.toggle('active');
        });
    });

    if (storyForm) {
        storyForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // 2. GATHER DATA
            const storyText = document.getElementById('story-input').value;
            const aliasInput = document.getElementById('alias-input')?.value || "Anonymous";
            
            // Collect all tags that have the 'active' class
            const selectedTags = Array.from(document.querySelectorAll('.tag-chip.active'))
                                     .map(chip => chip.getAttribute('data-tag'));

            // 3. VISUAL FEEDBACK
            statusMessage.innerHTML = "Encrypting and delivering to the Vault...";
            statusMessage.style.color = "var(--coffee-accent)";

            try {
                // 4. THE HANDSHAKE
                const response = await fetch(CONFIG.endpoints.submitStory, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        alias: aliasInput,     // Matches Model
                        message: storyText,    // Matches Model
                        tags: selectedTags,    // Array of strings (e.g. ["DV", "PTSD"])
                        submittedAt: new Date().toISOString()
                    })
                });

                if (response.ok) {
                    statusMessage.innerHTML = "✔ Your story has been safely received. Thank you for your courage.";
                    statusMessage.style.color = "#a370f7";
                    
                    // Reset form and UI tags
                    storyForm.reset();
                    tagChips.forEach(chip => chip.classList.remove('active'));
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

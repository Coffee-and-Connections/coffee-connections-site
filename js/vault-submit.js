/* =========================================
   VAULT-SUBMIT.JS
   The Secure Entryway for Survivor Stories
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    const storyForm = document.getElementById('vault-form');
    const statusMessage = document.getElementById('submission-status');
    const tagChips = document.querySelectorAll('.tag-chip');

    // 1. Tag Selection Logic (The Multi-Select)
    tagChips.forEach(chip => {
        chip.addEventListener('click', () => chip.classList.toggle('active'));
    });

    if (storyForm) {
        storyForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // 2. Stitching the Alias (Tony + S = Tony S.)
            const firstName = document.getElementById('first-name').value.trim();
            const lastInitial = document.getElementById('last-initial').value.trim();
            const backupAlias = document.getElementById('alias-input').value.trim();

            let finalAlias = "Anonymous";
            if (firstName) {
                finalAlias = lastInitial ? `${firstName} ${lastInitial}.` : firstName;
            } else if (backupAlias) {
                finalAlias = backupAlias;
            }

            // 3. Gathering Data & Tags (The fix for "Array Empty")
            const storyText = document.getElementById('story-input').value;
            const selectedTags = Array.from(document.querySelectorAll('.tag-chip.active'))
                                     .map(chip => chip.getAttribute('data-tag'));

            // 4. Visual Feedback
            statusMessage.innerHTML = "Encrypting and delivering to the Vault...";
            statusMessage.style.color = "var(--coffee-accent)";

            try {
                // 5. The Handshake
                const response = await fetch(CONFIG.endpoints.submitStory, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        alias: finalAlias,
                        message: storyText,
                        tags: selectedTags, 
                        submittedAt: new Date().toISOString()
                    })
                });

                if (response.ok) {
                    statusMessage.innerHTML = "✔ Your story has been safely received. Thank you for your courage.";
                    statusMessage.style.color = "#a370f7";
                    
                    // Reset UI
                    storyForm.reset();
                    tagChips.forEach(c => c.classList.remove('active'));
                } else {
                    throw new Error("Vault Busy");
                }
            } catch (error) {
                console.error("Vault Error:", error);
                statusMessage.innerHTML = "⚠️ Connection error. Please try again.";
                statusMessage.style.color = "#ffc107";
            }
        });
    }
});

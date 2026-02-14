/* =========================================
   POUR-LOGIC.JS
   The Digital Ledger for Pay-it-Forward
   ========================================= */

async function updatePourCounter() {
    const counterElement = document.getElementById('pour-count');
    try {
        // Fetching the current count from the Public Tower
        const response = await fetch(CONFIG.endpoints.getPourCount);
        const data = await response.json();
        
        if (counterElement) {
            counterElement.innerText = data.count; // e.g., "42 Pours Available"
        }
    } catch (err) {
        console.error("Ledger Error:", err);
    }
}

// Run on load
document.addEventListener('DOMContentLoaded', updatePourCounter);

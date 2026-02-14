/* =========================================
   MENU-LOGIC.JS
   Mapping Projections to the Sanctuary 8
   ========================================= */

document.addEventListener('DOMContentLoaded', async () => {
    const coffeeList = document.getElementById('coffee-list');
    const specialtyList = document.getElementById('specialty-list');
    const wellnessList = document.getElementById('wellness-list');

    try {
        const response = await fetch(CONFIG.endpoints.getMenu);
        const menuData = await response.json();

        menuData.forEach(item => {
            const itemHTML = `
                <div class="drink-item">
                    <div>
                        <span class="drink-name">${item.name}</span>
                        <span class="mission-name">"${item.missionAlias || 'The Standard'}"</span>
                    </div>
                    <span class="drink-price">$${item.price.toFixed(2)}</span>
                </div>
            `;

            // Logic to sort into the 3 columns
            if (item.category === 'Classic' || item.category === 'Espresso') {
                coffeeList.innerHTML += itemHTML;
            } else if (item.category === 'Specialty') {
                specialtyList.innerHTML += itemHTML;
            } else {
                wellnessList.innerHTML += itemHTML;
            }
        });
    } catch (err) {
        console.error("Menu Fetch Error:", err);
    }
});

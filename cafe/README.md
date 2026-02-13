# ☕ The Sanctuary (Café Operations)
### *The Economic Engine of Coffee & Connections*

This directory houses all frontend assets and logic related to the commercial operations of our trauma-informed coffee shop at 216 E Overland.

---

## 1. Purpose
The `/cafe` section is designed to convert general traffic into local customers and e-commerce supporters. It emphasizes:
* **Sensory Safety:** Promoting our "Sanctuary" environment.
* **Ethical Sourcing:** Highlighting our partnership with **Ben “The Beanfather” Riley**.
* **Sustainable Revenue:** Using retail margins to fund the Strong Bonds Resilience mission.

---

## 2. File Architecture
* `menu.html`: The digital menu. Features the **"Sanctuary Pour"** (for-here pricing that covers the cost of the safe space).
* `resilience-market.html`: Our e-commerce hub for ethically sourced roasts and trauma-informed merchandise.
* `trauma-informed-design.html`: Educational content explaining *why* the shop is built with low-sensory friction (lighting, sound, and textures).

---

## 3. Technical Standards
### Pathing
All files in this directory use **Relative Pathing** to access global styles and return to the dashboard:
* **CSS:** `<link rel="stylesheet" href="../css/(00)base.css">`
* **Home:** `<a href="../index.html">Dashboard</a>`

### Design Philosophy
The UI here must reflect the physical space:
* **Contrast:** High readability but low glare (utilizing the `dark-theme` body class).
* **Spacing:** Large touch targets for mobile users (students/service members) ordering on the go.

---

## 4. Key Messaging for Retail
When updating these files, ensure the following pillars are maintained:
1.  **Direct Impact:** Every cup sold contributes to the **Strong Bonds Resilience** fund.
2.  **Radical Welcome:** The shop is a "Third Place" for UTEP students, Fort Bliss personnel, and survivors alike.
3.  **Transparency:** Clearly state that 100% of "Resilience Market" proceeds support the mission.

---

## 5. Maintenance
* **Menu Updates:** Price changes should be reflected in `menu.html` immediately to maintain customer trust.
* **Stock Levels:** "New" or "Best Seller" badges in the Market should be rotated monthly to keep the storefront fresh for returning donors.

© 2026 Coffee & Connections | Social Enterprise Division

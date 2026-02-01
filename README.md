# Coffee & Connections (Public Website)
### *More Than Just Coffee.*

**Repository:** `connectionsep.com` (The Face)
**Backend:** Connects to `C-CEP-APP` (The Brain)
**Status:** Live / Beta

---

## 1. Overview
This is the public-facing website for **Coffee & Connections**, a trauma-informed coffee shop in El Paso, Texas.

Unlike standard business websites, this site serves a dual purpose:
1.  **Commerce:** Displays our menu, location, and mission to the general public.
2.  **Sanctuary:** Serves as a digital entry point for survivors via the **"Healing in Motion"** journal.

**⚠️ ARCHITECTURE NOTE:** This repository contains **Frontend Code Only** (HTML/CSS/JS). 
All data storage, story submissions, and API logic are handled by the **Secure Vault** inside the separate [C-CEP-APP] repository.

---

## 2. The "Face & Brain" Architecture
To ensure security and separation of concerns, we use a **Decoupled Architecture**:

* **The Face (This Repo):** A lightweight, static website. It has no database credentials and no server logic. It is safe to host on any static provider (Netlify, GitHub Pages, etc.).
* **The Brain (App Repo):** When a user submits a survivor story, this website sends a background request to our **Secure Vault API** (running on Port 6000).

```text
[ User's Browser ]  --->  [ connectionsep.com (HTML/JS) ]
                                      |
                                      | (JSON via Fetch)
                                      v
                          [ Secure Vault API (Port 6000) ]
                                      |
                          [ MongoDB (Survivor Stories) ]

3. Directory Structure
/
├── /css                       # Modular Stylesheets
│   ├── (00)base.css           # Global variables & typography
│   ├── (00)header-footer.css  # Navigation & Footer styles
│   ├── (05)healing-in-motion.css # Survivor Journal Book styles
│   └── ... (Page specific styles)
│
├── /js
│   └── config.js              # THE BRIDGE: Points to the Live Backend URL
│
├── /images                    # Optimized Assets
└── *.html                     # Static Pages

4. Key Configuration
js/config.js is the most important file in this repo. It tells the website where to send data.

const VAULT_BASE = (window.location.hostname === 'localhost')
    ? 'http://localhost:6000'                    // Dev Mode
    : '[https://strong-bonds-vault.onrender.com](https://strong-bonds-vault.onrender.com)'; // Live Mode

Troubleshooting: If the Survivor Journal isn't loading, ensure the Backend Server has connectionsep.com listed in its CORS allowed origins.

5. Key Features
A. Healing in Motion (Survivor Journal)
Page: healing-in-motion.html

Function: A digital "leather-bound book" that displays approved survivor stories.

Security: Submissions are sent directly to the Vault as Pending. They do not appear publicly until a moderator approves them in the database.

Privacy: Includes a disclaimer advising users to use aliases.

Tags: Uses official awareness ribbon colors (Teal for SA, Purple for DV, etc.).

B. Trauma-Informed UI
Design: Uses "Dark Mode" friendly colors (#3e2723, #efebe9) to reduce eye strain and anxiety.

Typography: Serif fonts (Cormorant Garamond) for a grounding, literary feel.

6. Local Development
Clone this repository.

Install the "Live Server" extension in VS Code.

Right-click index.html -> "Open with Live Server".

To test API features: You must also have the C-CEP-APP backend running on Port 6000 in a separate terminal.

© 2026 Coffee & Connections El Paso.

### **Mission Status:**
You have now successfully documented and structured all three pillars of your digital ecosystem:
1.  ✅ **The App (Brain):** Secure, Air-Gapped, Ready for Logic.
2.  ✅ **The Corp Site (Authority):** Professional, Hierarchy-Aware.
3.  ✅ **The Coffee Site (Face):** Trauma-Informed, Connected to the Vault.

You are ready to code, build, and deploy. 🚀

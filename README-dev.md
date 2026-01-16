# 🛠️ Developer Documentation & Handover Notes

## 🚨 LATEST UPDATE: Form Backend Migration (Jan 16, 2026)
**Change:** Switched contact form infrastructure from Formspree to **Getform.io**.
**Why:** To ensure stability and consolidate form handling under one reliable service with a generous free tier.
**Status:** * **Contact Form:** ✅ Connected & Tested. 
* **Survivor Journal:** ✅ Connected.
* **Action Required:** No further action needed for forms. Verify submissions in the Getform dashboard.

---

## 🔐 Site Status (Live & Secure)
* **Domain:** `connectionsep.coffee` is fully connected and HTTPS-enforced.
* **Repo:** `coffee-connections-site`
* **Tech Stack:** Static HTML/CSS with temporary JavaScript.
* **Environment:** No local dev environment—everything is hosted and edited directly in GitHub.

## 📝 Form Handling (Journal & Contact)
**Current Setup:**
* All submissions are routed securely via **Getform.io**.
* Form data is **not** stored locally or rendered live—only accessible via the Getform dashboard.
* **Constraint:** Free limit of 100 submissions/month. If we exceed this, we need to upgrade or build a custom backend.

---

## 🛠️ Future Work Needed for Vic
### 1. Backend & Rendering
* **Re-enable DOM rendering:** Journal entries are currently placeholder/static. (See commented code in HTML near line 183).
* **Backend Needs:** * Persist entries.
    * Moderate content (optional but recommended).
    * Display survivor stories dynamically.

### 2. Immediate Tasks (Backlog)
* [ ] Design live display of entries using JSON or database.
* [ ] Create thank-you redirect or success animation post-submission.
* [ ] **Optional:** Build an admin dashboard to review & approve entries.

---

## 🎨 Future Styling: Tag Coloring System
*Current Status:* Existing survivor journal tags are uniformly styled.
*Future Goal:* Dynamically color-code tags to reflect advocacy themes.

### 🏷️ Proposed Tag Palette
| Tag Category | Color | Hex Code | Emotional Context |
| :--- | :--- | :--- | :--- |
| **Mental Health Journey** | Blue | `#4682B4` | Stability, depth |
| **Domestic Violence Survivor** | Purple | `#800080` | Official DV awareness color |
| **Sexual Assault Survivor** | Teal | `#008080` | SA advocacy color |
| **PTSD & Complex Trauma** | Olive Green | `#556B2F` | Grounded, earthy, trauma-informed |
| **Anxiety & Depression** | Slate Gray | `#708090` | Calm, muted, reflective |
| **Grief & Loss** | Dusty Rose | `#C08081` | Tenderness, remembrance |
| **Addiction Recovery** | Bright Orange | `#FF8C00` | Energy, transformation |
| **Healing as a Caregiver** | Warm Gold | `#DAA520` | Light, honor, resilience |
| **Other** | Soft Lavender | `#E6E6FA` | Non-categorized, gentle identifier |

### 🧠 Implementation Guide
Add tag-specific classes (e.g., `.tag-sexual-assault`, `.tag-grief`) and use the following CSS block:

```css
/* 🎨 Advocacy Tag Colors */
.tag-mental-health      { background-color: #4682B4; color: white; } /* Blue */
.tag-domestic-violence  { background-color: #800080; color: white; } /* Purple */
.tag-sexual-assault     { background-color: #008080; color: white; } /* Teal */
.tag-ptsd-trauma        { background-color: #556B2F; color: white; } /* Olive Green */
.tag-anxiety-depression { background-color: #708090; color: white; } /* Slate Gray */
.tag-grief-loss         { background-color: #C08081; color: white; } /* Dusty Rose */
.tag-addiction-recovery { background-color: #FF8C00; color: white; } /* Bright Orange */
.tag-caregiver-healing  { background-color: #DAA520; color: white; } /* Warm Gold */
.tag-other              { background-color: #E6E6FA; color: #333; }   /* Lavender */

🔐 Site Status (Live & Secure)
Custom domain connectionsep.coffee is fully connected and HTTPS-enforced.
All site files live in this GitHub repo: coffee-connections-site
Built using static HTML/CSS with temporary JavaScript
No local dev environment—everything is hosted and edited directly in GitHub

📝 Survivor Journal – Form Status
✅ Current Setup
All submissions are now routed securely via Getform.io
Form data is not stored locally or rendered live—only accessible via Getform dashboard

🛠️ Future Work Needed
Re-enable DOM rendering of journal entries via backend (placeholder commented out in HTML near line 183)
Backend system to:
Persist entries
Moderate content (optional)
Display survivor stories dynamically
🎨 Tag Coloring – Future Styling Suggestion (Add to Dev README)
Existing survivor journal tags are uniformly styled. In future iterations, dynamically color code tags to reflect advocacy themes for greater emotional impact and clarity.

🏷️ Proposed Tag Palette
Tag	Color	Hex Code	Notes
Mental Health Journey	Blue	#4682B4	Stability, depth
Domestic Violence Survivor	Purple	#800080	Official DV awareness color
Sexual Assault Survivor	Teal	#008080	SA advocacy color
PTSD & Complex Trauma	Olive Green	#556B2F	Grounded, earthy, trauma-informed
Anxiety & Depression	Slate Gray	#708090	Calm, muted, reflective
Grief & Loss	Dusty Rose	#C08081	Tenderness, remembrance
Addiction Recovery	Bright Orange	#FF8C00	Energy, transformation
Healing as a Caregiver	Warm Gold	#DAA520	Light, honor, resilience
Other	Soft Lavender	#E6E6FA	Non-categorized, gentle identifier

🧠 Suggested Implementation
Add tag-specific classes (e.g., .tag-sexual-assault, .tag-grief, etc.)
Use dynamic CSS or backend rendering to assign classes based on content
Ensure WCAG-compliant contrast for accessibility

🧵 CSS: Emotionally-Resonant Tag Styling
Drop this block near the bottom of your stylesheet, or right after your existing .journal-tags li {} rules:

css
/* 🎨 Advocacy Tag Colors */
.tag-mental-health     { background-color: #4682B4; color: white; } /* Blue */
.tag-domestic-violence { background-color: #800080; color: white; } /* Purple */
.tag-sexual-assault    { background-color: #008080; color: white; } /* Teal */
.tag-ptsd-trauma       { background-color: #556B2F; color: white; } /* Olive Green */
.tag-anxiety-depression{ background-color: #708090; color: white; } /* Slate Gray */
.tag-grief-loss        { background-color: #C08081; color: white; } /* Dusty Rose */
.tag-addiction-recovery{ background-color: #FF8C00; color: white; } /* Bright Orange */
.tag-caregiver-healing { background-color: #DAA520; color: white; } /* Warm Gold */
.tag-other             { background-color: #E6E6FA; color: #333;   } /* Lavender */
You can customize the color: for text if any background needs better contrast.

🧪 How to Assign These Tags (HTML Usage)
In your journal entry block, format the <li> tags like this:

html
<li class="tag-sexual-assault">Sexual Assault Survivor</li>
<li class="tag-mental-health">Mental Health Journey</li>
If you're rendering dynamically later, your backend can assign the right class name based on tag content.

Suggested tools: Firebase, Supabase, Node.js API

Note: Previous JavaScript logic that injected journal entries client-side has been paused and moved to comments for future backend integration. See line 213 in Founding-Circle.html for full dev note.

🧾 Tasks You Might Pick Up, Vic
✉️ Add backend storage & rendering for submissions
📃 Design live display of entries using JSON or database
✨ Create thank-you redirect or success animation post-submission
🧠 Optional: Build an admin dashboard to review & approve entries before posting

🛑 Budget Constraints
Marylou is driving initial traffic, and we may hit the free limit of 100 submissions/month on Getform.io. If site growth exceeds that, we’ll explore paid plans or build a custom backend.
💰 Coffee & Connections Tech Budget – Monthly Expenses (Updated)
Item	Description	Amount (USD)
Google Domain: operationresiliencecorp.com	Annual cost divided over 12 months ($72.56/year)	$6.05
Additional Google Charge	Possibly for DNS or privacy registration	$5.45
Ionos Domain Guard	Domain privacy/protection	$1.00
Ionos Email Service	Custom domain email hosting	$1.00
Getform.io	Free tier (100 submissions/month)	$0.00
GitHub Pages Hosting	Free static site hosting	$0.00
Estimated Monthly Total: 🧮 $13.50

🧾 Notes for Vic or Finance
Ionos has replaced Cloudflare for domain protection and email
All hosting remains free via GitHub Pages
Submissions are safely stored offsite via Getform.io, with a free 100-entry limit per month
The site is public, HTTPS-secured, and actively receiving traffic via Marylou's outreach

We’re not open yet. Any dev decisions should prioritize essential infrastructure first, with space for aesthetic refinement later.

📇 Contact for Clarifications
Tony Sorensen El Paso, TX 📞 915-262-9834 ✉️ anthony.e.sorensen@operationresilience.com 🌐 connectionsep.coffee

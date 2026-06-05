# Samuel Bamigboye — Portfolio Website

A modern, responsive portfolio website built from CV data.  
**Stack:** Vanilla HTML5 · CSS3 · JavaScript (no frameworks)

---

## 🚀 Deploy in 60 Seconds

### Option A — GitHub Pages (Free)
1. Create a new GitHub repository (e.g. `portfolio`)
2. Upload `index.html`, `style.css`, and `script.js`
3. Go to **Settings → Pages → Source → main branch**
4. Your site is live at `https://yourusername.github.io/portfolio`

### Option B — Vercel (Free, Custom Domain)
1. Install Vercel CLI: `npm i -g vercel`
2. In the folder containing your files, run: `vercel`
3. Follow prompts — your site deploys instantly with HTTPS

### Option C — Netlify (Drag & Drop)
1. Go to [netlify.com/drop](https://app.netlify.com/drop)
2. Drag your project folder into the browser
3. Done — live URL provided immediately

### Option D — Local Preview
```bash
# Python
python -m http.server 3000

# Node.js
npx serve .
```
Then open `http://localhost:3000`

---

## 🎨 Customisation

### Colors
Edit CSS variables at the top of `style.css`:
```css
:root {
  --gold:   #C9A84C;   /* Primary accent */
  --accent: #4F8EF7;   /* Secondary accent */
  --bg:     #0A0A0F;   /* Dark background */
}
```

### Fonts
Change font imports in `index.html` `<head>` and update:
```css
--font-serif: 'Playfair Display', Georgia, serif;
--font-sans:  'DM Sans', system-ui, sans-serif;
```

### Profile Photo
Replace the placeholder initials in the About section with a real `<img>`:
```html
<!-- In .about-photo-placeholder, replace the <span>SB</span> with: -->
<img src="your-photo.jpg" alt="Samuel Bamigboye" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />
```

---

## ➕ Adding Projects
In `index.html`, copy a `.project-card` block and update:
- `data-category` → `engineering` | `marketing` | `analytics`
- `.project-number` → next number
- `h3` → project title
- `p` → description
- `.project-tech span` → technologies used
- `.project-type` → category label

---

## 📝 Updating Content
All content lives directly in `index.html` — no CMS or build step required.
- **Name / Title / Bio** → Hero section
- **Skills** → Skills section (adjust `data-width` for bar percentages)
- **Experience** → Timeline section
- **Certifications** → Certifications section
- **Contact details** → Contact section and Footer

---

## 📬 Making the Contact Form Send Real Emails
The form currently shows a success message only. To make it actually send:

### With Formspree (Free tier):
1. Sign up at [formspree.io](https://formspree.io)
2. Create a form and copy the endpoint URL
3. In `script.js`, replace the `setTimeout` block with:
```javascript
const formData = new FormData(contactForm);
fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST', body: formData,
  headers: { 'Accept': 'application/json' }
}).then(r => {
  if (r.ok) { formSuccess.classList.add('show'); contactForm.reset(); }
});
```

---

## 🧠 Features
- ✅ Dark / Light mode with localStorage persistence
- ✅ Animated particle canvas hero background
- ✅ Typing effect cycling through roles
- ✅ Scroll-triggered reveal animations
- ✅ Animated statistics counters
- ✅ Animated skill progress bars
- ✅ Tabbed skills section (Engineering / Marketing / Analytics / Tools)
- ✅ Expandable/collapsible experience timeline
- ✅ Project filter system
- ✅ Sticky navbar with active link highlighting
- ✅ Mobile hamburger menu
- ✅ Contact form with validation
- ✅ Back-to-top button
- ✅ Fully responsive (mobile-first)
- ✅ SEO meta tags + Open Graph

---

© 2026 Samuel Bamigboye

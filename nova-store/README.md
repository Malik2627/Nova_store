# 🛍️ NOVA STORE — Premium Modern eCommerce Landing Page

> **GUVI Full Stack Development Assignment**  
> **SEO Title**: `NOVA STORE | Everyday Style. Elevated.`  
> **SEO Meta Description**: `Discover modern fashion, accessories and everyday essentials at NOVA STORE.`  

A state-of-the-art, high-performance static eCommerce website built from scratch using pure HTML5, CSS3, and ES6+ Vanilla JavaScript. Features clean modern luxury styling, energetic electric orange accents, responsive grid structures, and interactive UI micro-animations without any backend or framework dependencies.

---

## 📁 Repository Structure

```text
nova-store/
├── index.html          # Semantic HTML5 scaffolding, SEO metadata & accessibility ARIA attributes
├── style.css           # Modern CSS design system, variables, tokens & responsive media queries
├── script.js           # Vanilla JavaScript application controller & DOM event handlers
├── README.md           # Comprehensive project documentation & deployment guide
└── assets/
    └── images/         # High-resolution product showcase & category assets
        ├── hero-fashion.png
        ├── hoodie-product.png
        ├── tshirt-product.png
        ├── sneakers-product.png
        ├── backpack-product.png
        ├── cargopants-product.png
        ├── watch-product.png
        ├── sunglasses-product.png
        ├── cap-product.png
        ├── category-men.png
        ├── category-women.png
        ├── category-accessories.png
        └── category-newarrivals.png
```

---

## ⚡ Technical Audit & Features Checklist

| Audit Item | Status | Details |
|---|---|---|
| **1. index.html** | ✅ PASS | Valid HTML5, semantic structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`). |
| **2. style.css** | ✅ PASS | Modern CSS design tokens (`:root`), Flexbox/Grid layouts, glassmorphism, smooth transitions. |
| **3. script.js** | ✅ PASS | Vanilla JS controller (ES6+), zero console errors, modular init pattern. |
| **4. Navigation Links** | ✅ PASS | Smooth scrolling internal anchor links (`#hero`, `#shop`, `#categories`, `#about`, `#sale`, `#contact`). |
| **5. Mobile Hamburger Menu** | ✅ PASS | Slide-down drawer (`#mobileDrawer`), scroll locking, keyboard accessibility (`Escape` key). |
| **6. Product Cards** | ✅ PASS | 8 curated cards with ratings, review counts, discount tags, prices, and CTA buttons. |
| **7. Add to Cart** | ✅ PASS | Triggers notification: **`"Added to cart!"`** and increments cart badge counter. |
| **8. Wishlist Heart Toggle** | ✅ PASS | Toggles solid electric orange heart fill (`#ff5500`), increments wishlist badge counter. |
| **9. Newsletter Form** | ✅ PASS | Required email validation, regex check, hides form on submit & shows **`"Thanks for subscribing to NOVA STORE!"`**. |
| **10. Promotional Countdown** | ✅ PASS | Live frontend JavaScript timer updating Days, Hours, Minutes, and Seconds. |
| **11. Search Modal** | ✅ PASS | Overlay search popup with input focus, popular search chips, escape key support. |
| **12. Scroll Reveal** | ✅ PASS | `IntersectionObserver` smoothly revealing product cards and sections on scroll. |
| **13. Asset Paths** | ✅ PASS | 100% relative paths (`style.css`, `script.js`, `assets/images/...`), zero localhost/file system paths. |
| **14. Responsive Layout** | ✅ PASS | Pixel-perfect across **320px**, **375px**, **425px**, **768px**, **1024px**, and **1440px** viewports. |
| **15. Accessibility & SEO** | ✅ PASS | Single `<h1>`, logical heading hierarchy, explicit `<label>` elements, `:focus-visible` focus rings. |
| **16. Backend Dependencies** | ✅ PASS | **0 Backend dependencies**, 100% static client-side web application. |

---

## 🌐 GitHub Pages Deployment Guide

Follow these simple steps to deploy NOVA STORE to GitHub Pages:

### Step 1: Initialize Git & Commit
Open your shell terminal in the project directory:
```bash
git init
git add .
git commit -m "Initial release of NOVA STORE eCommerce Landing Page"
```

### Step 2: Push to GitHub Repository
Create a public repository named `nova-store` on GitHub and run:
```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nova-store.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your GitHub repository in your browser.
2. Click on the **Settings** tab.
3. In the left navigation menu, click **Pages** (under Code and automation).
4. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` (or `master`) and set the folder to `/ (root)`.
5. Click **Save**.
6. Wait 1–2 minutes, then refresh the page to view your published live site URL (e.g., `https://YOUR_USERNAME.github.io/nova-store/`).

---

## 🛠️ Verification & Offline Testing

To test locally before uploading:
```bash
python -m http.server 8080 --directory .
```
Then visit `http://localhost:8080` in your web browser.

---

*Created for GUVI Full Stack Development Program.*

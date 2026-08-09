# Premier Schools Exhibition (PSE) Landing Page

A pixel-perfect, WCAG 2.2 AA accessible, responsive, and framework-free landing page for the **Premier Schools Exhibition (PSE)** built for the **SRV Media Frontend Developer Assignment**.

---

## 🚀 Live Deployment & Links

- **Live Firebase Application**: [https://premier-schools-exhibition.web.app](https://premier-schools-exhibition.web.app)
- **Firebase Project Console**: [premier-schools-exhibition](https://console.firebase.google.com/project/premier-schools-exhibition/overview)
- **Figma Design Reference**: [Premier Schools Exhibition Figma Prototype](https://www.figma.com/proto/uZ4DJ3er9xPeKYeb80VdMG/Premier-Schools-Exhibition--PSE--LP--12-06-2025-?node-id=1376-1295&t=74eHMUDVIk1mpqEO-1&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=749%3A1439)

---

## 🌟 Key Features & Development Guidelines Compliance

### 1. Stack & Architecture
- **Vanilla Tech Stack**: Built exclusively using **Semantic HTML5**, **Vanilla Custom CSS**, and **Vanilla JavaScript** without any external CSS/JS frameworks or libraries (No React, Tailwind, Bootstrap, or jQuery).
- **BEM Naming Convention**: Modular, reusable CSS structured using strict **Block-Element-Modifier (BEM)** class architecture.
- **W3C Validated**: Valid HTML5 markup following web standards without syntax errors.

### 2. Dual-State Sticky Navigation Header
- **Unscrolled State (At Top of Page)**: Clean white background (`#FFFFFF`), `80px` height with a prominent `95px` logo protruding over the hero, and the original `REGISTER NOW ↗` button with dark purple border.
- **Scrolled Sticky State**: Seamless transition to a fixed dark purple gradient sticky header (`position: fixed; top: 0; width: 100%; height: 80px`). Logo smoothly scales down (`64px`) to fit inside the bar, and the CTA transforms into a white pill button (`Register Now →`) with a straight right arrow.

### 3. Dual-Axis Hero Slider
- **Horizontal & Vertical Axes**: Supports horizontal main slide navigation (Boarding Schools, STEM Academies, International IB) and vertical sub-pane tabs inside each slide.
- **Interactivity & Controls**: Auto-play interval with hover-pause, touch swipe gestures (X & Y axis for mobile/touch devices), and full keyboard navigation (Left/Right & Up/Down arrow keys).

### 4. Participating School Logos Sling Marquee
- **Dual-Track Continuous Flow**: Alternating movement directions (Row 1: Left-to-Right, Row 2: Right-to-Left) creating a dynamic infinite marquee effect.
- **Accessibility Pause**: Automatically pauses animation when hovered with a mouse or focused via keyboard navigation.

### 5. "Choose the School That Fits You Best" Section
- **Responsive Layout**: 4-card grid on desktop viewports (`>= 768px`) that seamlessly transforms into a mobile horizontal swipe slider with interactive pagination dots on smaller viewports (`< 768px`).

### 6. Pre-Schedule School Appointments Section
- **Visual Design**: Custom left-to-right purple gradient (`#DEC1FF` to `#EAD7FF`) matching Figma specs, calibrated counseling photo positioning, and interactive appointment buttons redirecting to the hero enquiry form.

### 7. "What Makes This Exhibition a Must-Visit" Section
- **Unbounded Carousel Slider**: Cards slide smoothly edge-to-edge across full viewport width without clipping inside fixed container boundaries.
- **Responsive Background Assets**: Utilizes `BG-Desktop.png` for desktop and curved `bg-mobile.png` asset for mobile viewports.
- **Centered Controls**: Horizontally centered navigation arrow buttons (`btn1.png` & `btn2.png`) below the highlight cards.

### 8. Custom Footer & Global White Copyright Bar
- **Footer Landmark**: Includes Premier Schools Exhibition logo, Kolkata Corporate Office address, Ahmedabad Office address, clickable phone contacts (`9674805912` / `9674585012`), and soft purple rounded social media icon buttons (`insta.png`, `facebook.png`, `Youtube.png`).
- **Copyright Bar**: Dedicated full-width section with a pure white background (`#FFFFFF`) featuring a link to [https://www.premierschoolsexhibition.com/](https://www.premierschoolsexhibition.com/).

### 9. Accessibility (WCAG 2.2 AA) & QA
- **Keyboard Navigation**: Complete keyboard accessibility for all buttons, links, sliders, and form inputs (Tab, Shift+Tab, Enter, Space, Arrow keys).
- **ARIA & Screen Readers**: Uses `aria-label`, `aria-hidden`, and `aria-live="polite"` regions for screen reader announcements.
- **Skip Link**: Includes a high-contrast `#main-content` skip-to-content link at top of page.
- **Reduced Motion Support**: Fully respects user motion preferences via `@media (prefers-reduced-motion: reduce)`.

---

## 📁 Project Directory Structure

```
SRVMedia_clientel_School_Exhin_Web/
├── index.html                       # Main Semantic HTML5 document (W3C Valid)
├── css/
│   ├── variables.css                # Theme tokens (colors, typography, spacing, shadows)
│   ├── base.css                     # CSS Reset, typography, accessibility & utilities
│   ├── components/
│   │   ├── header.css               # Dual-state sticky header & CTA button styles
│   │   ├── hero.css                 # Dual-axis hero slider styles
│   │   ├── marquee.css              # Continuous dual-track alternating logo marquee
│   │   ├── school-cards.css         # Choose the school grid & mobile slider
│   │   ├── exhibition.css           # Exhibition highlight cards slider & background assets
│   │   ├── form.css                 # Lead registration form & validation states
│   │   └── footer.css               # Footer 5-column layout & white copyright bar
│   └── responsive.css               # Responsive breakpoints & prefers-reduced-motion
├── js/
│   ├── dual-axis-slider.js          # Hero dual-axis slider engine
│   ├── logo-marquee.js              # Marquee hover & focus pause controller
│   ├── school-cards-slider.js       # Mobile cards swipe & pagination controller
│   ├── exhibition-slider.js         # Exhibition cards slider logic
│   └── main.js                      # Application initializer & scroll listener
├── Assets/                          # Project image & graphic assets
├── package.json                     # Project configuration & npm scripts
├── firebase.json                    # Firebase Hosting deployment config
└── README.md                        # Documentation & guidelines
```

---

## 💻 How to Run & Validate Locally

1. **Serve Application Locally**:
   ```bash
   npx serve .
   ```
   Or open `index.html` directly in any web browser.

2. **Validate HTML**:
   ```bash
   npx -y html-validate index.html
   ```

3. **Deploy to Firebase**:
   ```bash
   npx -y firebase-tools@latest deploy
   ```

---

## 📬 Contact & Submission Details

- **Candidate Name**: Ayush Mishra
- **Target Role**: Frontend Developer (Crio.do Referral / SRV Media Assignment)
- **Submission Email**: `Jitesh.sharma@srvmedia.com`
- **Live Application**: [https://premier-schools-exhibition.web.app](https://premier-schools-exhibition.web.app)

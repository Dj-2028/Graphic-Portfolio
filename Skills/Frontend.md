# 🎨 Frontend Architecture & Implementation Guide

## Graphic Designer Portfolio

---

## 1. Project Structure

```
portfolio/
├── public/
│   ├── fonts/                  # Self-hosted fonts
│   ├── images/                 # Static images, og-image
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   ├── images/             # Project thumbnails, portrait
│   │   └── icons/              # Custom SVG icons
│   ├── components/
│   │   ├── ui/                 # shadcn/ui generated components
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── PageWrapper.jsx
│   │   ├── common/
│   │   │   ├── CustomCursor.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── MagneticButton.jsx
│   │   │   ├── SplitText.jsx
│   │   │   ├── RevealText.jsx
│   │   │   └── ScrollProgress.jsx
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── WorkGrid.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Process.jsx
│   │   │   └── Contact.jsx
│   │   └── project/
│   │       ├── ProjectHero.jsx
│   │       ├── ProjectGallery.jsx
│   │       ├── ProjectMeta.jsx
│   │       └── ProjectNav.jsx
│   ├── data/
│   │   ├── projects.js         # All project data
│   │   ├── skills.js
│   │   └── services.js
│   ├── hooks/
│   │   ├── useMousePosition.js
│   │   ├── useLenis.js
│   │   └── useScrollProgress.js
│   ├── lib/
│   │   └── utils.js            # shadcn cn() utility
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Work.jsx
│   │   ├── ProjectDetail.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── styles/
│   │   ├── globals.css         # Tailwind base + CSS vars
│   │   └── fonts.css
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 2. Tailwind Configuration

```js
// tailwind.config.js
export default {
    content: ["./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                bg: {
                    primary: "#0A0A0A",
                    secondary: "#111111",
                    card: "#161616",
                },
                text: {
                    primary: "#F5F0E8",
                    secondary: "#9A9488",
                    muted: "#4A4640",
                },
                accent: {
                    yellow: "#FFD60A",
                    red: "#FF4D1C",
                    green: "#00FF85",
                },
            },
            fontFamily: {
                display: ["'Playfair Display'", "serif"],
                mono: ["'DM Mono'", "monospace"],
                sans: ["'Syne'", "sans-serif"],
            },
            fontSize: {
                "fluid-hero": "clamp(3.5rem, 10vw, 9rem)",
                "fluid-h2": "clamp(2rem, 5vw, 4.5rem)",
                "fluid-h3": "clamp(1.25rem, 3vw, 2rem)",
            },
            animation: {
                "cursor-pulse": "pulse 1.5s ease-in-out infinite",
                "float": "float 6s ease-in-out infinite",
                "grain": "grain 0.5s steps(1) infinite",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-12px)" },
                },
                grain: {
                    "0%, 100%": { transform: "translate(0, 0)" },
                    "25%": { transform: "translate(-2%, -3%)" },
                    "50%": { transform: "translate(3%, 2%)" },
                    "75%": { transform: "translate(-1%, 4%)" },
                },
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
```

---

## 3. CSS Variables & Global Styles

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
    :root {
        --bg-primary: #0a0a0a;
        --text-primary: #f5f0e8;
        --accent: #ffd60a;
        --border: rgba(245, 240, 232, 0.08);
    }

    * {
        cursor: none;
    }

    html {
        background: var(--bg-primary);
        color: var(--text-primary);
        scroll-behavior: auto; /* Lenis handles this */
    }

    ::selection {
        background: var(--accent);
        color: #0a0a0a;
    }
}

/* Film grain overlay */
.grain::after {
    content: "";
    position: fixed;
    inset: -200%;
    width: 400%;
    height: 400%;
    background-image: url("data:image/svg+xml,..."); /* noise SVG */
    opacity: 0.035;
    animation: grain 0.5s steps(1) infinite;
    pointer-events: none;
    z-index: 9999;
}
```

---

## 4. Component Specifications

---

### 4.1 `CustomCursor.jsx`

```jsx
// Two elements: main cursor circle + trailing dot
// Uses useMousePosition hook + Framer Motion spring physics

const springConfig = { damping: 25, stiffness: 300 };

// Main cursor: 40x40 circle, mix-blend-mode: difference
// Dot: 8x8 circle, faster spring
// On hover over [data-cursor="link"]: scale up cursor to 80px
// On hover over [data-cursor="drag"]: show "DRAG" text inside cursor
```

**Key behaviors:**

- `mix-blend-mode: difference` on cursor = white circle inverts content beneath
  it
- Cursor hides on page load, appears after loader exits
- All `<a>`, `<button>` elements get `data-cursor="link"` automatically

---

### 4.2 `Loader.jsx`

```jsx
// Full-screen intro that plays once per session (sessionStorage flag)
// Sequence:
// 1. Counter counts 0 → 100 over 2s
// 2. Your name/initials morphs in with clip-path
// 3. Screen splits horizontally and slides off (top + bottom panels)
// 4. Triggers onComplete callback → reveals page

const loaderVariants = {
    exit: {
        clipPath: ["inset(0 0 0 0)", "inset(50% 0 50% 0)"],
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
};
```

---

### 4.3 `MagneticButton.jsx`

```jsx
// Wraps any button/link with magnetic hover effect
// On mouse proximity (within ~80px), element follows cursor with reduced movement
// Uses useMousePosition + Framer Motion transform

const MagneticButton = ({ children, strength = 0.4 }) => {
    // Calculates offset from button center
    // Applies motion.div with x/y spring values
    // strength controls how far the button "pulls" toward cursor
};
```

---

### 4.4 `SplitText.jsx`

```jsx
// Splits text into individual characters or words
// Each char/word gets staggered Framer Motion entrance
// Used for hero headline

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.03 } },
};

const child = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
    },
};
// Wraps each char in overflow-hidden span
```

---

### 4.5 `Hero.jsx`

**Layout:**

```
┌─────────────────────────────────────────────┐
│  [AVAILABLE FOR WORK ●]          [SCROLL ↓] │
│                                              │
│   FULL-NAME                                  │  ← fluid-hero font-display
│   GRAPHIC                                   │
│   DESIGNER.                                 │
│                                              │
│   ─────  Brand · UI/UX · Motion · Print     │
│                                              │
│   [VIEW WORK →]          [2024 PORTFOLIO]   │
└─────────────────────────────────────────────┘
```

**Animations:**

1. Name chars stagger in with `SplitText` (delay: after loader)
2. Subtitle line slides in from left
3. Tags fade up staggered
4. Availability badge pulses green dot
5. Background: subtle animated mesh gradient using CSS `@keyframes`

---

### 4.6 `WorkGrid.jsx`

**Layout — editorial magazine grid:**

```
┌──────────────────┬────────┬────────┐
│                  │   02   │   03   │
│       01         │        │        │
│   (2/3 width)    ├────────┴────────┤
│                  │       04        │
├────────┬─────────┤   (full width)  │
│   05   │   06    │                 │
└────────┴─────────┴─────────────────┘
```

**Project Card Hover:**

```jsx
// Card has overflow-hidden
// Image scale: 1 → 1.08 on hover (Framer Motion)
// Overlay: opacity 0 → 1, shows project name + "VIEW →"
// Category tag slides up from bottom
// Entire card has subtle border glow with accent color
```

**Filter Animation:**

- Tabs use Framer Motion `layoutId` for animated underline indicator
- Cards filter with AnimatePresence (scale + fade out/in)

---

### 4.7 `ProjectDetail.jsx`

**Scroll-based animations:**

```jsx
// Hero image: parallax scroll (y offset via useScroll + useTransform)
// Project metadata sidebar: sticky on desktop
// Gallery images: staggered reveal with useInView
// Case study text: reveal paragraph by paragraph

const { scrollYProgress } = useScroll({ target: containerRef });
const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
```

---

### 4.8 `Skills.jsx`

**Animated skill bars:**

```jsx
// Each skill: label + progress bar
// Bar animates width from 0 → value when in viewport
// Uses useInView + animate() from Framer Motion
// Skills grouped: Design Tools / Soft Skills / Platforms
```

**Tools grid:**

```jsx
// 6-column logo grid
// Each tool logo: grayscale by default
// Hover: color + lift shadow + tooltip with tool name
```

---

### 4.9 `Contact.jsx`

**Layout:**

```
LET'S WORK
TOGETHER.                 ← Giant display text

[NAME ____________]
[EMAIL ___________]
[MESSAGE _________]
[__________________]

             [SEND IT →]   ← Magnetic button

INSTAGRAM  DRIBBBLE  BEHANCE  LINKEDIN
```

**Form interactions:**

- shadcn `Input` and `Textarea` with custom dark styling
- Label floats up on focus (CSS transform)
- Submit button: loading spinner → checkmark on success
- Toast notification via shadcn `Toast`

---

## 5. Page Transitions

```jsx
// PageWrapper.jsx — wraps every page
// Uses AnimatePresence in App.jsx on <Routes>

const pageVariants = {
    initial: {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
    },
    animate: {
        clipPath: "inset(0 0% 0 0)",
        opacity: 1,
        transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
        clipPath: "inset(0 0 0 100%)",
        opacity: 0,
        transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
    },
};

// App.jsx
<AnimatePresence mode="wait">
    <Routes location={location} key={location.pathname}>
        ...
    </Routes>
</AnimatePresence>;
```

---

## 6. Lenis Smooth Scroll Setup

```jsx
// hooks/useLenis.js
import Lenis from "lenis";
import { useEffect } from "react";

export const useLenis = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);
};
```

---

## 7. Data Structure

```js
// data/projects.js
export const projects = [
    {
        id: "01",
        slug: "brand-identity-studio",
        title: "Studio Identity",
        category: "Branding",
        tags: ["Brand Identity", "Logo", "Typography"],
        year: "2024",
        client: "Studio Noir",
        role: "Brand Designer",
        tools: ["Figma", "Illustrator"],
        thumbnail: "/images/projects/studio-thumb.webp",
        heroImage: "/images/projects/studio-hero.webp",
        gallery: ["/images/projects/studio-1.webp", "..."],
        description:
            "Full brand identity for an independent creative studio...",
        featured: true,
        color: "#FFD60A", // accent color per project
    },
    // ... more projects
];
```

---

## 8. Responsive Breakpoints

| Breakpoint | Width       | Layout Notes                           |
| ---------- | ----------- | -------------------------------------- |
| Mobile     | < 640px     | Single column, reduced animations      |
| Tablet     | 640–1024px  | 2-column grid, side-by-side sections   |
| Desktop    | 1024–1440px | Full editorial grid, side panels       |
| Wide       | > 1440px    | Max-width container (1400px), centered |

**Mobile-specific:**

- Custom cursor disabled
- Magnetic buttons deactivated
- Page transitions simplified (fade only)
- Loader skip option

---

## 9. Performance Checklist

- [ ] `React.lazy()` + `Suspense` for each page route
- [ ] Images wrapped in custom `LazyImage` component with fade-in
- [ ] Framer Motion `LazyMotion` with `domAnimation` features only
- [ ] `will-change: transform` only while animating, removed after
- [ ] Font preload links in `index.html`
- [ ] Vite bundle analysis run before deploy

---

## 10. shadcn/ui Components Used

| Component           | Usage                          |
| ------------------- | ------------------------------ |
| `Button`            | CTA buttons (heavily restyled) |
| `Input`             | Contact form fields            |
| `Textarea`          | Contact message field          |
| `Toast` / `Toaster` | Form submission feedback       |
| `Badge`             | Project category tags          |
| `Separator`         | Section dividers               |
| `Dialog`            | Lightbox for gallery           |
| `Tabs`              | Work filter bar                |
| `Progress`          | Skill bars                     |

---

_Frontend spec version: 1.0 | Stack: React 18 + Vite + Tailwind v3 + shadcn/ui +
Framer Motion v11_

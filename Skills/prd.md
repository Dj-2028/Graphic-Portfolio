# 📋 Product Requirements Document (PRD)

## Graphic Designer Portfolio — _"The Designer's Canvas"_

---

## 1. Product Overview

### Vision

A visually immersive, animation-rich personal portfolio for a graphic designer.
The experience itself _is_ the proof of craft — every scroll, hover, and
transition communicates design sensibility. Built entirely in the frontend with
React.js, Tailwind CSS, shadcn/ui, and Framer Motion.

### Tagline

> _"Where design breathes."_

### Core Philosophy

- The portfolio IS the design work — not just a container for it
- Motion is intentional, never decorative noise
- Every interaction should feel like turning a page in a beautifully printed
  book
- Dark, editorial aesthetic: think Print magazine meets a Figma canvas at night

---

## 2. Target Audience

| Audience                   | Goal                                                |
| -------------------------- | --------------------------------------------------- |
| Potential clients          | Evaluate visual style, process, and professionalism |
| Recruiters / Art Directors | Quickly scan skills, tools, and project depth       |
| Fellow designers           | Appreciate the craft of the portfolio itself        |
| Collaborators              | Find contact + understand working style             |

---

## 3. Goals & Success Metrics

### Goals

- Establish a strong, memorable personal brand
- Showcase 6–8 selected design projects with depth
- Communicate skills, tools, and personality
- Make it easy for visitors to reach out

### Success Metrics

- Avg. session duration > 3 minutes
- Contact form / CTA conversion > 8%
- Portfolio felt "unique" in user feedback
- Load time under 3s on 4G

---

## 4. Scope — Frontend Only

**In Scope:**

- All UI pages and sections
- Framer Motion animations and transitions
- React Router for navigation
- Static data (JSON/constants) for projects and content
- shadcn/ui for base components (customized heavily)
- Tailwind CSS utility styling
- Responsive design (mobile → desktop)
- Custom cursor
- Lenis smooth scroll
- SEO-friendly meta tags via React Helmet

**Out of Scope:**

- Backend / server
- Database or CMS
- Authentication
- Real form submission (mailto: or third-party service like Formspree is OK)
- SSR / Next.js

---

## 5. Pages & Sections

### 5.1 Landing / Hero (`/`)

- Full-viewport animated intro
- Designer name with kinetic typography
- Animated tagline (typewriter or staggered reveal)
- Scroll indicator with pulsing animation
- Background: animated mesh gradient or noise texture

### 5.2 About (`/about` or section)

- Large portrait with masked reveal animation
- Bio text with staggered entrance
- "What I do" — animated pill tags (Brand Identity, UI/UX, Motion, Print…)
- Tools grid (Figma, Illustrator, Photoshop, After Effects…) with hover states
- Downloadable Resume CTA

### 5.3 Work / Projects (`/work`)

- Masonry or editorial grid of project cards
- Each card: hover reveals overlay with project name + category
- Filter bar (All / Branding / UI/UX / Print / Motion)
- Staggered card entrance on load
- Featured project takes full width

### 5.4 Project Detail (`/work/:slug`)

- Full-bleed hero image with parallax
- Project metadata (Client, Year, Role, Tools)
- Scrollable case study layout
- Image gallery with lightbox
- Before/After slider (optional)
- Next/Prev project navigation

### 5.5 Skills & Services

- Animated skill bars or radial charts
- Service cards with icon + description
- Design process steps (horizontal scrolling timeline)

### 5.6 Contact (`/contact` or section)

- Large CTA headline with animated underline
- Contact form (Name, Email, Message) — shadcn/ui form components
- Social links with hover animations
- Location + availability status badge

### 5.7 Footer

- Minimal, dark
- Copyright, social icons, back-to-top

---

## 6. Design Direction

### Aesthetic

**Dark Editorial / Luxury Brutalist**

- Dark background (`#0A0A0A` near-black)
- Off-white / cream text (`#F5F0E8`)
- Accent: electric amber or acid yellow (`#FFD60A`)
- Secondary accent: muted warm red (`#FF4D1C`)
- Monospace elements mixed with a sharp serif display font

### Typography

- Display: `"PP Editorial New"` or `"Playfair Display"` (serif, editorial)
- Body: `"DM Mono"` or `"Syne Mono"` (mono, techy)
- UI Labels: `"Syne"` (geometric, modern)

### Motion Principles

| Type             | Approach                                     |
| ---------------- | -------------------------------------------- |
| Page transitions | Slide + clip-path wipe                       |
| Scroll reveals   | Staggered fade-up (Framer Motion `viewport`) |
| Hover states     | Magnetic effect on buttons, image scale      |
| Cursor           | Custom SVG cursor with follower dot          |
| Loading          | Animated counter / logo morph intro screen   |

---

## 7. Accessibility & Performance

- Keyboard navigable
- ARIA labels on all interactive elements
- Color contrast AA compliant
- Reduced motion via `prefers-reduced-motion`
- Code-split per route (React.lazy)
- Images: WebP format, lazy-loaded
- Fonts: `font-display: swap`

---

## 8. Tech Stack Summary

| Layer         | Technology                 |
| ------------- | -------------------------- |
| Framework     | React 18 + Vite            |
| Styling       | Tailwind CSS v3            |
| Components    | shadcn/ui (Radix UI base)  |
| Animation     | Framer Motion v11          |
| Routing       | React Router v6            |
| Smooth Scroll | Lenis                      |
| Icons         | Lucide React + custom SVGs |
| SEO           | React Helmet Async         |
| Deployment    | Vercel / Netlify (static)  |

---

## 9. Deliverables

- [ ] Fully functional React SPA
- [ ] Responsive across mobile, tablet, desktop
- [ ] 6–8 placeholder projects with real layout
- [ ] All animations implemented
- [ ] Custom cursor
- [ ] Contact form wired to mailto: or Formspree
- [ ] README with setup instructions

---

_Document version: 1.0 | Last updated: April 2026_

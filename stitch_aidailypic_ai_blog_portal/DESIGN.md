# DESIGN.md

## 1. Overview

This project is an AI blog platform called **aidailypic.com**.

Design philosophy:
- Clean, modern editorial layout
- Content-first structure
- Optimized for readability and ad revenue
- Minimal UI noise, high clarity

---

## 2. Design Principles

### Core Principles
- Content is the primary focus
- Use spacing and background instead of borders
- Maintain consistent layout across all pages
- Optimize for SEO and long reading sessions

---

## 3. Color System

### Base Colors
- background: #ffffff
- surface: #f7f9fb
- surface-container-low: #f0f4f7
- surface-container: #eaeff2
- primary: #5148d8
- text-primary: #111111
- text-secondary: #555555

---

## 4. Tailwind Mapping

### Backgrounds
- bg-background: bg-white
- bg-surface: bg-[#f7f9fb]
- bg-surface-low: bg-[#f0f4f7]
- bg-surface-container: bg-[#eaeff2]

### Text
- text-primary: text-[#111111]
- text-secondary: text-[#555555]

### Primary
- text-primary-color: text-[#5148d8]
- bg-primary-color: bg-[#5148d8]

---

## 5. Layout Rules

### Desktop Layout
- max width: 1200px
- content width: 720px
- sidebar width: 300px
- gap between content and sidebar: 32px

### Mobile Layout
- single column
- sidebar moves below content
- padding: 16px

### Spacing Scale
- small: 8px
- medium: 16px
- large: 24px
- section gap: 32px ~ 48px

---

## 6. Typography

### Headings
- H1: 32px, bold
- H2: 24px, bold
- H3: 20px, medium

### Body
- font size: 16px
- line height: 1.7

### Rules
- Keep strong hierarchy
- Use generous spacing between sections
- Avoid dense text blocks

---

## 7. Components

### Header
- sticky top
- contains:
  - logo
  - navigation menu
  - search bar

---

### PostCard
- background: surface-low
- padding: 24px
- layout: vertical
- elements:
  - title (h2)
  - short description
  - category/tag
- hover: slight background change

---

### Sidebar
- background: surface-container
- padding: 24px
- contains:
  - popular posts
  - categories
  - ads

---

### Article Layout
- max width: 720px
- centered
- structure:
  - title
  - meta (author, date)
  - table of contents
  - content body
  - related posts

---

### Table of Contents
- sticky on desktop
- simple vertical list
- highlight active section

---

### Category Tag
- small rounded badge
- background: surface-container
- text: secondary

---

### Pagination
- centered
- simple number buttons

---

## 8. Ad Slots (VERY IMPORTANT)

### Locations
- Top banner (below header)
- Below article title
- Mid-content (after 2~3 sections)
- End of article
- Sidebar ads

### Rules
- Ads must not interrupt reading flow
- Keep spacing around ads
- Ads should visually blend with layout
- Do NOT overload ads in one area

---

## 9. UI Rules (Do / Don't)

### Do
- Use spacing to separate sections
- Use background layers instead of borders
- Keep layout consistent
- Maintain readable line length

### Don't
- Do NOT use `border: 1px solid` for layout separation
- Do NOT overuse shadows
- Do NOT create overly complex UI
- Do NOT break content flow with design elements

---

## 10. SEO & Content Structure

### Article Requirements
- Must support long-form content
- Use clear heading hierarchy (H1 → H2 → H3)
- Include table of contents
- Include internal links
- Include related posts

---

## 11. Implementation Notes

- Use Tailwind CSS only
- Create reusable components
- Avoid duplicating layout code
- Use mock data first, then replace with API
- Always keep layout consistent across pages

---

## 12. Done Criteria (for Codex)

Every implementation must satisfy:

1. Layout matches design rules
2. Components are reusable
3. Responsive (desktop + mobile)
4. Tailwind classes used correctly
5. No layout-breaking styles
6. Lint / typecheck passes
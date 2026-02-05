---
name: ui-ux-pro-max
description: Comprehensive design intelligence skill. 67+ styles, 96+ palettes, 99+ UX guidelines.
---

# UI/UX Pro Max

## When to Apply
Reference these guidelines when:
- Designing new UI components or pages.
- Choosing color palettes and typography.
- Reviewing code for UX issues.
- Building landing pages or dashboards.
- Implementing accessibility requirements.

## Rule Categories by Priority
- **Accessibility (CRITICAL)**: Color contrast (4.5:1), visible focus rings, aria-labels, keyboard navigation.
- **Touch & Interaction (CRITICAL)**: Minimum 44x44px touch targets, cursor-pointer on interactive elements, loading button states.
- **Performance (HIGH)**: Image optimization (WebP, srcset), reduced motion check, content jumping prevention.
- **Layout & Responsive (HIGH)**: Viewport meta tags, minimum 16px body text on mobile, z-index management.
- **Typography & Color (MEDIUM)**: Line-height 1.5-1.75, line length 65-75 characters, font-pairing personality match.
- **Animation (MEDIUM)**: Duration 150-300ms for micro-interactions, transform/opacity over width/height.
- **Charts & Data (LOW)**: Match chart type to data, accessible palettes, data table alternatives.

## How to Use This Skill

### Step 1: Analyze User Requirements
Identify product type, style keywords, industry, and technology stack.

### Step 2: Generate Design System (REQUIRED)
Always start by generating a complete design system. This includes:
1. Analysis of product, style, color, and typography.
2. Selection of best matches based on industry rules.
3. Defining patterns, colors, typography, and effects.

### Step 3: Persist Design System (Master + Overrides Pattern)
Save the design system for hierarchical retrieval:
- **MASTER.md** — Global Source of Truth.
- **Page-specific overrides** — Page-specific deviations from Master.

### Step 4: Supplement with Detailed Searches
Use domain-specific searches (style, chart, ux, typography, landing) to refine specific elements.

### Step 5: Match Technology Stack
Apply implementation-specific best practices for the chosen stack (React, Vue, HTML+Tailwind, etc.).

## Common Rules for Professional UI
- **No emoji icons**: Use SVG icons (Heroicons, Lucide, etc.).
- **Stable hover states**: Use transitions on hover.
- **Floating navbar**: Use spacing (e.g., top-4) instead of sticking to top-0 where appropriate for the style.
- **Consistent max-width**: Use uniform container widths (e.g., max-w-7xl).

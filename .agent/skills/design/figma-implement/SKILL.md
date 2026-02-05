---
name: figma-implement
description: Translates Figma designs into production-ready code with 1:1 visual fidelity.
---

# Implement Design

## Required Workflow

### Step 1: Get Node ID
Extract key and node-id from Figma URL: `https://figma.com/design/:fileKey/:fileName?node-id=1-2`
- File key: `:fileKey`
- Node ID: `1-2`

### Step 2: Fetch Design Context
Run `get_design_context(fileKey=":fileKey", nodeId="1-2")` to get:
- Layout properties (Auto Layout, constraints)
- Typography specs
- Color values and tokens
- Component structure and variants

### Step 3: Capture Visual Reference
Run `get_screenshot(fileKey=":fileKey", nodeId="1-2")` as the source of truth for visual validation.

### Step 4: Download Required Assets
Download images, icons, and SVGs returned by the Figma server. Follow these rules:
- Use provided source directly if available.
- DO NOT import new icon packages; all assets should come from the design payload.

### Step 5: Translate to Project Conventions
Translate the design output into the project's framework (React, Tailwind, etc.):
- Replace utility classes with project preferred utilities/tokens.
- Reuse existing components (buttons, inputs) instead of duplicating.
- Respect project color system and typography scale.

### Step 6: Achieve 1:1 Visual Parity
- Prioritize design fidelity.
- Use design tokens where available.
- Follow WCAG accessibility requirements.

### Step 7: Validate Against Design
Ensure final implementation matches the visual reference and design properties.

## Implementation Rules
- Place UI components in the designated design system directory.
- Follow component naming conventions.
- Avoid inline styles; map tokens to project variables.
- Keep components composable and reusable.
- Add TypeScript types and JSDoc comments.

## Best Practices
- **Always Start with Context**: Fetch design context and screenshots first.
- **Incremental Validation**: Validate frequently during implementation.
- **Document Deviations**: If you must deviate, document why in comments.
- **Reuse Over Recreation**: Check for existing components before creating new ones.
- **Design System First**: Prefer design system patterns over literal translation.

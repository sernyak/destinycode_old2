# Copilot instructions for Destiny Code (concise)

Purpose: give AI coding agents immediate, actionable context to work productively in this repo.

- **Big picture**: single-page Vite app that loads small, stage-based modules. Routing is in `src/utils/router.js` and modules live in `src/modules/*` as paired `index.js` + `view.html`. App state is centralized in `src/utils/state.js` and persisted to `sessionStorage` under the `destinyUser` key. See bootstrap logic in [src/main.js](src/main.js#L1-L200).

- **Key flows & boundaries**:
  - UI routing & lifecycle: `src/main.js` registers stage init functions and contains session-restore + payment-return logic ([src/main.js](src/main.js#L1-L400)).
  - State management: use `state.get()` / `state.set()` from `src/utils/state.js` (single source of truth).
  - AI/backend integration: all model requests go through the secure proxy `API.PROXY` and the helper `requestAI()` in `src/services/api.service.js`. Payload shape: `{ action, data, modelName }`. The function also expects model output possibly wrapped in triple-backtick JSON blocks and extracts that. See `requestAI` implementation ([src/services/api.service.js](src/services/api.service.js#L1-L200)).
  - Payment flow: configured in `src/config.js` (endpoints like `VERIFY`, `PAYMENT_RETURN`, `WEBHOOK`) and handled across `src/services/payment.service.js` and `src/main.js`. The app uses PRG-style payment return endpoint (`PAYMENT_RETURN`) — preserve that behavior when changing routing or payment code. ([src/config.js](src/config.js#L1-L200)).

- **Patterns & conventions to follow**:
  - Modules export an `init` function and a `view.html` file; register modules with `router.register('routeName', initFn)` in `src/main.js`.
  - Avoid duplicating AI requests: `startBackgroundGeneration()` uses a global `backgroundGenerationPromise` and `cachedReportData` in `src/services/api.service.js` to dedupe and reuse results.
  - Email/PDF generation uses `formatReportToHtml()` which inlines styles for email clients and expects `reportData.sections` structure. If you modify HTML generation, keep inline-styles compatibility in mind. ([src/services/api.service.js](src/services/api.service.js#L1-L400)).
  - Timeouts: `requestAI()` uses `AbortController` with `SYSTEM.REQUEST_TIMEOUT_MS` from `src/config.js`; use the same pattern for other long fetches.
  - Error handling: many service functions return fallback objects instead of throwing (e.g., `getFreeAnalysis` returns an error-shaped object). Mirror this pattern when adding new service wrappers.

- **Dev / build commands** (from `package.json`):
  - `npm run dev` — start Vite dev server
  - `npm run build` — produce `dist/` (configured in `vite.config.js`)
  - `npm run preview` — preview build

- **Files to inspect when changing behavior** (examples):
  - App bootstrap & routing: [src/main.js](src/main.js#L1-L400)
  - Global config & API endpoints: [src/config.js](src/config.js#L1-L200)
  - AI + report generation: [src/services/api.service.js](src/services/api.service.js#L1-L400)
  - Payment helpers: [src/services/payment.service.js](src/services/payment.service.js#L1-L200)
  - Router and modules: [src/utils/router.js](src/utils/router.js#L1-L200) and `src/modules/*/index.js`

- **Examples of important snippets to emulate**:
  - Dedupe background work: reuse `backgroundGenerationPromise` in `startBackgroundGeneration()`.
  - Session restore: `sessionStorage.getItem('destinyUser')` logic in `src/main.js` — important for payment-return flows.
  - AI response parsing: `rawText.match(/```json\\n([\\s\\S]*?)\\n```/)` inside `requestAI()` — other code expects JSON extracted this way.

- **When editing**:
  - Keep `public/` assets and `view.html` modular templates intact; modules assume those static files exist.
  - Preserve API request shapes: backend expects `{ action, data, modelName }` on `API.PROXY` and other endpoints expect specific JSON fields (email/PDF endpoints consume `reportHtml`, `userEmail`, etc.). See `src/services/api.service.js` calls to `API.EMAIL` and `API.PDF`.
  - If changing payment or PRG handling, update both `src/config.js` endpoints and the URL-handling logic in `src/main.js` (look for `verify_order` and `upsell_source`).

If anything here is unclear or you want more examples (module lifecycle, state keys, or exact AI action names), tell me which area to expand and I will iterate.

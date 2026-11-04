# Bühler Line Monitor

Angular application for monitoring a product-bagging production line consisting of four machines:
Scale → Bag Attach → Packer → Bag Closer. Each machine is in one of three states (Running, Alarm,
Warning), each with its own Material Symbols icon and color. The line is shown in two places:
a **navigation bar** and a **line overview** (machine tiles connected in sequence). Both views must
always show the same state. Selecting a machine in either view opens its routed **detail**
(`/machines/:id`).

The reference mockup is `docs/mockup.png`. Visual decisions (layout, colors, short names, icons)
follow it unless `PLAN.md` says otherwise.

## Workflow

- The implementation is split into steps in `PLAN.md` (a local working plan, not versioned; it may
  change during the project). Work on one step at a time and do not start the next one unless
  asked.
- At the end of each step: run `npm run lint`, `npm test -- --watch=false` and `npm run build`,
  fix any failures, then summarize the changes and suggest a commit message (the one from
  `PLAN.md` fits). Do not commit or push unless asked.
- Commits are made by the developer, who chooses the message; Conventional Commits are preferred
  but not required. Do not flag commit messages in reviews.
- Keep changes scoped to the current step. No speculative features or unnecessary dependencies.
- When unsure about a design decision, ask instead of guessing.

## Tech stack and conventions

- Angular 22, standalone components only, no NgModules.
- Signals for state (`signal`, `computed`, `input()`, `output()`). RxJS only where it is the better
  fit (HTTP, timers, streams), bridged with `toSignal` at the edges. Avoid `effect()` for deriving
  state; prefer `computed`.
- Built-in control flow (`@if`, `@for` with `track`), zoneless change detection. OnPush is the
  default in Angular 22, so do not set `changeDetection` explicitly.
- `inject()` instead of constructor injection.
- Strict TypeScript, no `any`. Domain types live in `src/app/core/models`.
- SCSS. Colors, spacing and sizes are CSS custom properties defined in `src/styles/_tokens.scss`.
  State colors (background, text, icon) are defined once in `src/styles/_machine-state.scss`;
  every view of a machine uses its `colors` mixin. No UI component library.
- Icons: Material Symbols Outlined (Google Fonts), rendered through the shared `Icon` component
  (`app-icon`). The font link in `src/index.html` downloads only the icons listed in `icon_names`;
  add every new icon there (alphabetical order) or it renders as plain text.
- File and class names follow the Angular 20+ style guide: `header.ts` / `Header`, no
  `.component` suffix.

## Project structure

- `src/app/core` – models, state configuration, store, status data sources
- `src/app/layout` – app shell and header
- `src/app/features/line` – navigation bar, line overview, machine tile, machine detail
- `src/app/shared` – small reusable components (icon, state badge, clock)
- `public/` – static assets (`buhler-logo.svg`, `data/machines.json`)
- `docs/` – reference material (`mockup.png`)
- `e2e/` – Playwright end-to-end tests

## Testing

- Unit and component tests with Vitest, placed next to the source as `*.spec.ts`.
- End-to-end tests with Playwright in `e2e/`, deterministic (no reliance on random state changes).

## Accessibility

- State is never conveyed by color alone: every machine tile and navigation item exposes its name
  and state to assistive technologies.
- All interactive elements are keyboard accessible with a visible focus indicator.
- Colors follow the mockup exactly, even where white text on the alarm/warning backgrounds misses
  WCAG AA contrast. Such deviations are recorded in `TODO.md` instead of being fixed.

## TODO.md

Known issues and deliberate deviations that are out of scope for now. When you notice one, add it
there rather than fixing it outside the current step.

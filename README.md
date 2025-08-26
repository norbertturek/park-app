# ParkApp

A small Vue 3 + TypeScript app for opening gates/booms ("bramy"/"szlabany"). It demonstrates a simple login flow and an app screen for selecting a pilot and a gate.

## Tech Stack

- Vue 3 + TypeScript + Vite
- Vue Router 4
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- MSW (Mock Service Worker) for dev-time GraphQL mocks
  - Note: For the public demo on Vercel, MSW is also started in production so the app works without a backend.
- `vite-svg-loader` for importing SVGs as Vue components (`?component`)

## Getting Started

Install dependencies and run the dev server.

Using npm:

```bash
npm install
npm run dev
```

Using yarn:

```bash
yarn
yarn dev
```

Build:

```bash
npm run build
# or
yarn build
```

Preview production build:

```bash
npm run preview
# or
yarn preview
```

## Development Notes

- Dev mocks start automatically in development from `src/mocks` via MSW (see `src/main.ts`).
- SVGs are imported as Vue components, e.g.:

  ```ts
  import ArrowIcon from '@/assets/arrow.svg?component'
  ```

- Tailwind v4 is enabled through the Vite plugin. Utility classes are used throughout the app. A local utility `.inner-shadow` exists in `src/pages/AppView.vue` (scoped) for the pilot selector dots.

## App Structure

- `src/pages/LoginView.vue` – login screen
- `src/pages/AppView.vue` – app screen with pilot and gate selection
- `src/App.vue` – base layout (header/footer hidden on app screen)
- `src/main.ts` – app bootstrap and router configuration

### Routes

- `/` – Login view
- `/app` – Main app (pilot/gates)

### Auth Flow

- Token is managed in `src/features/auth/tokenStorage`.
- On successful login in `LoginView.vue`, the user is redirected to `/app`.
- If already authenticated and visiting `/`, we redirect to `/app` on mount.
- `AppView.vue` is protected on mount: without a token we redirect to `/`.
- In `AppView.vue`, clicking the back arrow logs the user out (clears token) and navigates to `/`.

### UI Behavior (AppView)

- Only one pilot is active at a time. Pilot selection is controlled via dot indicators beneath the pilot section.
- Within a pilot, one gate (brama) is active at a time; clicking a different one switches the active state.

## Credentials (for local dev)

- Tip on the login form: `demo@park.app` / `demo`

## Deployment (Vercel)

- SPA rewrites are configured in `vercel.json` so client-side routing works.
- MSW is started in production via `src/mocks/index.ts` and `src/main.ts` to mock the `/graphql` Login mutation on Vercel.
- If/when you connect a real backend, revert to starting MSW only in development and remove the production worker start.

## Scripts

- `dev` – start Vite dev server
- `build` – type-check (`vue-tsc`) and build
- `preview` – preview the production build

## Contributing

- Branch: feature branches (e.g., `feat/ux-pilot`).
- PRs: open on GitHub. CI/CD not configured in this repo.

## License

MIT (or project-specific license, if different)

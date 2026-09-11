# FPL Ultimate Frontend

React frontend providing a better UI for Fantasy Premier League draft data. Consumes the `fpl-ultimate-api`. The long-term goal is a full standalone FPL platform UI, but current focus is a read-only view of the official FPL data.

## Active App

The active application is in `fpl-ultimate/` — React + TypeScript, actively developed
(league standings, current matchups, calls the live API). There is no other app
directory in this repo; an earlier `fpl-ultimate-react/` scaffold existed briefly and
was deleted for being an unused duplicate.

## Tech Stack

- **React 18** + **TypeScript** (Create React App)
- **Bulma** for CSS
- **Testing Library** + **Jest** for tests

## Running Locally

```bash
cd fpl-ultimate
npm start
```

Hits the deployed stage API directly (`REACT_APP_API_BASE_URL` in `.env.development`)
— there's no local mock server for the Lambda API the way the Java API has WireMock.

## Deployment

Deployed to GitHub Pages at `www.fplultimate.com` (with `fplultimate.com` redirecting
into it) via `.github/workflows/deploy-pages.yml`, triggered on push to `main`.
Production API base URL is baked in at build time via `.env.production`.

## Project Structure

```
fpl-ultimate/
├── public/
└── src/
    ├── components/    # React components
    ├── types/         # Shared TS types, matching the API's JSON shape
    ├── App.tsx
    └── index.tsx
```

## Priorities

**Short-term:** Read-only UI displaying scraped FPL data from the API. Better UX than the official site is the bar.

**Long-term:** Full standalone FPL platform UI with custom scoring, team management, and write operations.

## Conventions

- Functional components throughout
- Standard TypeScript and React conventions — no unusual patterns
- Bulma for styling — use Bulma classes before reaching for custom CSS

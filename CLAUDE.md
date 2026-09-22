# FPL Ultimate Frontend

React frontend providing a better UI for Fantasy Premier League draft data. Consumes the `fpl-ultimate-api`. The long-term goal is a full standalone FPL platform UI, but current focus is a read-only view of the official FPL data.

## Active App

The active application is in `fpl-ultimate/` — React + TypeScript, actively developed
(league standings, current matchups, calls the live API). There is no other app
directory in this repo; an earlier `fpl-ultimate-react/` scaffold existed briefly and
was deleted for being an unused duplicate.

League Table and My Team are built and live, restyled to the dark purple/blue/green
theme in the root-level `*.dc.html` mockups (see this repo's root `README.md`).
Players, Login, and Signup are mockups only — not yet built.

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

Deployed to GitHub Pages, mirroring the API's stage/prod split:
- Prod: GitHub Release → `deploy-pages-prod.yml` → `fplultimate.com`
- Stage: manual dispatch (branch input) → `deploy-pages-stage.yml` → `fplultimate.com/stage/`

Both environments are rebuilt into one combined artifact on every deploy — GitHub Pages
serves one site per repo, so stage lives at a subpath of prod's domain rather than its
own. The `stage` branch is a pointer the stage workflow force-updates to whatever branch
was deployed, so the prod workflow can rebuild that same stage content without wiping it
out on release. `REACT_APP_API_BASE_URL` and `PUBLIC_URL` differ per environment/build
(see the workflow files) — `.env.production`/`.env.development` only cover the prod build
and local dev, respectively.

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

## Theming

Dark purple/blue/green palette, defined as CSS variables in `src/index.css` (`--color-bg`,
`--color-surface`, `--color-accent`, etc.) — matches the root-level `*.dc.html` mockups.

**Import order matters and is easy to get backwards:** `bulma/css/bulma.min.css` must be
imported in `index.tsx` *before* `./index.css`. Bulma ships same-specificity rules for
`.table`, `.button`, `.select select`, and `.modal-card-*` that silently override the theme
if Bulma's CSS lands later in the bundle — it did once, and every table/button/select/modal
rendered in Bulma's default light colors instead of the theme until the import order was
fixed. Don't move the Bulma import into `App.tsx` or any component file.

## Conventions

- Functional components throughout
- Standard TypeScript and React conventions — no unusual patterns
- Bulma for structural classes (`is-flex`, `columns`, modal markup, etc.); colors and
  surfaces come from the theme's CSS variables, not Bulma's default palette

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

My Team has since grown past what those mockups show — see "My Team screen" below.

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

## My Team screen

`PointsScreen.tsx` (nav label "My Team", `Tab` value `points`) has two ways to show
a team's roster, both fed by `/league/gameweek-points`:

- **List View** (`MatchupRoster.tsx`) — the merged home/away table from the mockup.
  Desktop/tablet only (`is-hidden-mobile`); not offered on mobile at all.
- **Pitch View** (`PitchRoster.tsx`) — NOT in the original mockups; added after they
  shipped, modeled directly on `draft.premierleague.com`'s own Points → Pitch View
  (visited live to copy its layout and assets). Players sit on a pitch background by
  formation row (GKP/DEF/MID/FWD), bench below. Both teams' pitches render
  side-by-side at desktop width (`≥1024px`, `.pitch-side-by-side` in `index.css`);
  stack on narrower screens. **Mobile always shows Pitch View** — there's no
  List/Pitch toggle below the tablet breakpoint (`is-hidden-tablet` block in
  `PointsScreen.tsx` renders it unconditionally); List View's merged table doesn't
  fit well that narrow.

Both views share the same per-player conventions, sourced from the API:
- **Name**: the API's `name` field is already FPL's own short `web_name` (last name
  or common nickname, e.g. `Gabriel`, `J.Timber`) — display it as-is, don't try to
  shorten a full name client-side.
- **Club crest**: `getClubCrestUrl()` in `src/clubCrests.ts` maps the API's 3-letter
  `club` short code to a `resources.premierleague.com/premierleague25/badges/<code>.svg`
  URL, via a hardcoded short-code → numeric-team-code table (stable for a season;
  source of truth is `bootstrap-static`'s `teams[].code`, same host the API's lambda
  already calls). Used in both views — inline next to the name in List View, as the
  marker icon in Pitch View.
- **Not-yet-played placeholder**: instead of a bare "–", show the upcoming fixture as
  `<opponent short code>(<H/A>)`, e.g. `LIV(A)` — built from the API's `opponent` +
  `isHome` fields. In List View this replaces the points text in the score column
  (widened to 56px to fit it); in Pitch View it replaces the points line under the
  marker. `PlayerModal.tsx`'s "hasn't played yet" text uses the same format.
- **Pitch background**: `PitchRoster.tsx`'s `PITCH_BACKGROUND_URL` points at
  `draft.premierleague.com/assets/pitch-default-<hash>.svg` — the real pitch graphic
  the official site uses, but it's a *hashed build asset* off their own bundle, not a
  stable CDN path like the crest badges. It can 404 whenever they ship a new
  build/deploy; if the pitch background silently disappears, that's almost certainly
  why — re-visit the live site's Points → Pitch View and re-scrape the current
  `pitch-default-*.svg` filename from a `background-image` computed style.

## Conventions

- Functional components throughout
- Standard TypeScript and React conventions — no unusual patterns
- Bulma for structural classes (`is-flex`, `columns`, modal markup, etc.); colors and
  surfaces come from the theme's CSS variables, not Bulma's default palette

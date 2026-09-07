# FPL Ultimate Frontend

React frontend providing a better UI for Fantasy Premier League draft data. Consumes the `fpl-ultimate-api`. The long-term goal is a full standalone FPL platform UI, but current focus is a read-only view of the official FPL data.

## Active App

The active application is in `fpl-ultimate-react/`. The `fpl-ultimate/` directory is an older vanilla JS version — treat it as archived.

## Tech Stack

- **React 18** + **TypeScript** (Create React App)
- **Bulma** for CSS
- **Testing Library** + **Jest** for tests

## Running Locally

```bash
cd fpl-ultimate-react
npm start
```

## Project Structure

```
fpl-ultimate-react/
├── public/
└── src/
    ├── components/    # React components
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

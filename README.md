# Site flow mockups

Design mockups for the full FPL Ultimate site flow — auth, league table, my team
(head-to-head points), and player search — each in a mobile and a desktop
version. These are reference/planning material, not application code: nothing
here is wired into the React app in `fpl-ultimate/`.

**Live, interactive version:** https://claude.ai/artifact/YJWi9asJFskVR6gqZ39FMG
(open this to click through the flow, view both breakpoints side by side on
one canvas, and leave comments). The files in this folder are the same
content, kept here as a durable snapshot so a Claude session working in this
repo (with no access to claude.ai) can still read the current design intent
and layout by opening the `.dc.html` files directly.

## Screens

| Screen | Mobile | Desktop |
|---|---|---|
| Log in | `Main.dc.html` | `LoginDesktop.dc.html` |
| Sign up | `SignupMobile.dc.html` | `SignupDesktop.dc.html` |
| League table (standings + current matchups) | `LeagueTableMobile.dc.html` | `LeagueTableDesktop.dc.html` |
| My team (head-to-head gameweek points) | `MyTeamMobile.dc.html` | `MyTeamDesktop.dc.html` |
| Players (search + stats) | `PlayersMobile.dc.html` | `PlayersDesktop.dc.html` |

`canvas.json` records each artboard's position/size on the design canvas and
is only meaningful together with the live version above — it's not consumed
by anything in this repo.

## Format note

Each `.dc.html` file is a self-contained "Design Component" — HTML/CSS plus a
small class-based JS component (`class Component extends DCLogic`) that the
claude.ai artifact runtime renders. They **will not render correctly if
opened directly in a browser** (they depend on a `support.js` runtime the
artifact host injects) — read them as source for their markup, styling and
data shape, not as a working preview. For a working preview, use the live
link above.

## Design decisions baked into these mockups

- **Palette:** dark theme, purple/blue/green accents (inspired by
  premierleague.com), not the current app's green/gold. Purple = primary
  buttons/brand; blue = nav active states/links; green = points, live
  badges, and "your team" highlighting. See any file's `:root` CSS variables
  for exact values.
- **Auth:** account fields are first name, last name, email, password —
  deliberately no team name, since a user account is separate from any
  league team (a person can belong to more than one league/team).
- **My Team:** rosters are shown as one merged, row-aligned comparison table
  (your player vs. their player per roster slot) rather than two stacked
  lists, so gameweek points can be compared directly — closer to how
  mainstream fantasy sports apps show a head-to-head matchup.
- **Standings:** W/L/D is shown as a single hyphenated field (e.g. `4-1-0`),
  not separate columns or letter-suffixed numbers.
- **Matchup cards:** single horizontal line (`Team A  score - score  Team B`)
  rather than two stacked team/score rows.

## Status

Short-term scope only (read-only views matching the current
`fpl-ultimate-api` + Lambda scraper). Team management, drafting, and write
operations are long-term and not mocked here yet.

**Built and live in `fpl-ultimate/`:** League table and My Team (head-to-head
points), restyled to match these mockups' dark theme — see that app's
`index.css` for the palette. **Not yet built:** Players, Login, Signup — these
mockups are still just design reference for those three.

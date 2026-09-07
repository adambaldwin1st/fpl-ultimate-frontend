### Project Overview
The fpl-ultimate-frontend repository is the frontend component of fplultimate.com. It enables users to draft players from the Premier League, manage their fantasy teams, and compete head-to-head for points each week.

### Deployment
The application is hosted on a Raspberry Pi, and deploys to production are triggered via GitHub releases. Merging to the main branch initiates a deployment to dev.fplultimate.com. The API is accessible behind the `/api` endpoint for both production and development environments.

### GitHub Issues
All project tasks and to-dos are tracked via GitHub Issues, located in the fpl-ultimate-api repository for simplicity.

---

### Claude Code Setup

This repo uses a `CLAUDE.md` file to provide AI context when working with Claude Code. The parent directory (`fpl-ultimate/`) contains a top-level `CLAUDE.md` that imports both this file and the API's `CLAUDE.md`, so Claude has full project context when activated from the parent.

To replicate this for a new developer:

1. Clone both repos (`fpl-ultimate-api` and `fpl-ultimate-frontend`) into a shared parent directory
2. Create a `CLAUDE.md` in the parent directory with the following content:

```markdown
@import fpl-ultimate-api/CLAUDE.md
@import fpl-ultimate-frontend/CLAUDE.md
```

The sub-repo `CLAUDE.md` files are tracked in version control. The parent-level file is local only.

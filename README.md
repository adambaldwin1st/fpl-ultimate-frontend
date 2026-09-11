### Project Overview
The fpl-ultimate-frontend repository is the frontend component of fplultimate.com. It enables users to draft players from the Premier League, manage their fantasy teams, and compete head-to-head for points each week.

### Deployment
The application is deployed to GitHub Pages, mirroring the API's stage/prod pattern:
- **Prod**: publish a GitHub Release → deploys at `fplultimate.com` (`www.fplultimate.com`
  redirects into it), pointed at the prod API.
- **Stage**: `Actions → Deploy Pages (Stage) → Run workflow` → prompts for a branch →
  deploys at `fplultimate.com/stage/`, pointed at the stage API.

GitHub Pages only supports one live site per repo, so stage can't get its own domain
the way the API's Lambda functions did — both environments share the same domain/cert,
with stage living at a subpath. Every deploy rebuilds BOTH environments into one combined
artifact (see the workflow files for why), so a prod release won't wipe out an in-progress
stage deploy, and vice versa.

There's an older, currently-unused `deploy-frontend.yml` workflow (manual-dispatch only)
from an earlier plan to SSH/SFTP a build to a self-hosted Raspberry Pi — left in place but
superseded by the GitHub Pages workflow above.

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

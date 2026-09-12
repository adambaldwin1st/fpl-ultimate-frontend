const SELECTED_TEAM_KEY = 'fpl-ultimate:selectedTeam';

export function getStoredTeam(): string | null {
    try {
        return localStorage.getItem(SELECTED_TEAM_KEY);
    } catch {
        return null;
    }
}

export function setStoredTeam(teamName: string): void {
    try {
        localStorage.setItem(SELECTED_TEAM_KEY, teamName);
    } catch {
        // localStorage may be unavailable (private browsing, disabled storage) -
        // losing the "remember my team" nicety isn't worth failing over.
    }
}

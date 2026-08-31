export interface StandingsRow {
    rank: number;
    teamName: string;
    managerName: string;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    pointsFor: number;
    pointsAgainst: number;
    leaguePoints: number;
}

export interface Matchup {
    gameweek: number;
    homeTeamName: string;
    homeScore: number;
    awayTeamName: string;
    awayScore: number;
    finished: boolean;
}

export interface StatBreakdown {
    name: string;
    points: number;
    value: number;
}

export interface PlayerGameweekPoint {
    name: string;
    positionType: 'GKP' | 'DEF' | 'MID' | 'FWD' | 'UNK';
    squadPosition: number;
    isStarter: boolean;
    opponent: string;
    isHome: boolean | null;
    started: boolean;
    points: number | null;
    breakdown: StatBreakdown[];
}

export interface TeamGameweekPoints {
    teamName: string;
    managerName: string;
    totalPoints: number;
    players: PlayerGameweekPoint[];
}

export interface GameweekPointsResponse {
    gameweek: number;
    selectedTeam: TeamGameweekPoints;
    opponentTeam: TeamGameweekPoints;
}

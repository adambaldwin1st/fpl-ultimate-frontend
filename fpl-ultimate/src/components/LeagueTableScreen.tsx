import React from 'react';
import LeagueStandings from './LeagueStandings';
import CurrentMatchups from './CurrentMatchups';
import { useApiData } from '../hooks/useApiData';
import { Matchup } from '../types/league';

const LeagueTableScreen: React.FC = () => {
    const { data: matchups } = useApiData<Matchup[]>('/league/current-matchups', []);
    const gameweek = matchups[0]?.gameweek;

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem' }}>
            <div className="is-flex is-align-items-baseline is-justify-content-space-between mb-4">
                <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 700 }}>League Table</h1>
                {gameweek !== undefined && (
                    <span style={{ fontSize: '14px', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                        Gameweek {gameweek}
                    </span>
                )}
            </div>

            <p className="section-label">This week's matchups</p>
            <CurrentMatchups />

            <p className="section-label" style={{ marginTop: '36px' }}>
                Standings
            </p>
            <LeagueStandings />
        </div>
    );
};

export default LeagueTableScreen;

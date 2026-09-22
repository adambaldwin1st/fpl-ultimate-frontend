import React from 'react';
import { Matchup } from '../types/league';
import { useApiData } from '../hooks/useApiData';
import MatchupCard from './MatchupCard';

const CurrentMatchups: React.FC = () => {
    const { data: matchups, loading, error } = useApiData<Matchup[]>('/league/current-matchups', []);

    if (loading) {
        return <p style={{ color: 'var(--color-text-muted)' }}>Loading matchups…</p>;
    }

    if (error) {
        return <p className="has-text-danger">Couldn't load this week's matchups: {error}</p>;
    }

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                marginBottom: '36px',
            }}
        >
            {matchups.map((matchup) => (
                <MatchupCard key={`${matchup.homeTeamName}-${matchup.awayTeamName}`} matchup={matchup} />
            ))}
        </div>
    );
};

export default CurrentMatchups;

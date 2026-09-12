import React from 'react';
import { Matchup } from '../types/league';
import { useApiData } from '../hooks/useApiData';
import { MY_TEAM_NAME } from '../config';
import MatchupCard from './MatchupCard';

const CurrentMatchups: React.FC = () => {
    const { data: matchups, loading, error } = useApiData<Matchup[]>('/league/current-matchups', []);

    if (loading) {
        return <p style={{ color: 'var(--color-text-muted)' }}>Loading matchups…</p>;
    }

    if (error) {
        return <p className="has-text-danger">Couldn't load this week's matchups: {error}</p>;
    }

    const myMatchup = matchups.find(
        (m) => m.homeTeamName === MY_TEAM_NAME || m.awayTeamName === MY_TEAM_NAME
    );
    const otherMatchups = matchups.filter((m) => m !== myMatchup);

    return (
        <div>
            {myMatchup && <MatchupCard matchup={myMatchup} featured />}

            <div className="columns is-multiline">
                {otherMatchups.map((matchup) => (
                    <MatchupCard key={`${matchup.homeTeamName}-${matchup.awayTeamName}`} matchup={matchup} />
                ))}
            </div>
        </div>
    );
};

export default CurrentMatchups;

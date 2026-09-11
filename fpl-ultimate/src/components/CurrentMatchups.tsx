import React, { useEffect, useState } from 'react';
import { Matchup } from '../types/league';
import { API_BASE_URL } from '../config';

const CurrentMatchups: React.FC = () => {
    const [matchups, setMatchups] = useState<Matchup[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/league/current-matchups`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }
                return response.json();
            })
            .then(setMatchups)
            .catch((err) => setError(err.message));
    }, []);

    if (error) {
        return <p className="has-text-danger">Couldn't load this week's matchups: {error}</p>;
    }

    return (
        <div className="columns is-multiline">
            {matchups.map((matchup) => (
                <div className="column is-half" key={`${matchup.homeTeamName}-${matchup.awayTeamName}`}>
                    <div className="box">
                        <p className="has-text-weight-semibold">Gameweek {matchup.gameweek}</p>
                        <div className="level">
                            <div className="level-left">
                                <span>{matchup.homeTeamName}</span>
                            </div>
                            <div className="level-right">
                                <span className="tag is-medium">
                                    {matchup.homeScore} - {matchup.awayScore}
                                </span>
                            </div>
                        </div>
                        <p>{matchup.awayTeamName}</p>
                        <p className="is-size-7 has-text-grey">{matchup.finished ? 'Final' : 'Live'}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CurrentMatchups;

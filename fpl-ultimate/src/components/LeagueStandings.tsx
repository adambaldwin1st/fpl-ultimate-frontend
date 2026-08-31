import React, { useEffect, useState } from 'react';
import { StandingsRow } from '../types/league';

const LeagueStandings: React.FC = () => {
    const [standings, setStandings] = useState<StandingsRow[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/league/standings')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }
                return response.json();
            })
            .then(setStandings)
            .catch((err) => setError(err.message));
    }, []);

    if (error) {
        return <p className="has-text-danger">Couldn't load standings: {error}</p>;
    }

    return (
        <table className="table is-fullwidth is-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Team</th>
                    <th>Manager</th>
                    <th>P</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>PF</th>
                    <th>PA</th>
                    <th>Pts</th>
                </tr>
            </thead>
            <tbody>
                {standings.map((row) => (
                    <tr key={row.rank + row.teamName}>
                        <td>{row.rank}</td>
                        <td>{row.teamName}</td>
                        <td>{row.managerName}</td>
                        <td>{row.played}</td>
                        <td>{row.won}</td>
                        <td>{row.drawn}</td>
                        <td>{row.lost}</td>
                        <td>{row.pointsFor}</td>
                        <td>{row.pointsAgainst}</td>
                        <td>
                            <strong>{row.leaguePoints}</strong>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default LeagueStandings;

import React from 'react';
import { StandingsRow } from '../types/league';
import { useApiData } from '../hooks/useApiData';
import { MY_TEAM_NAME } from '../config';

const LeagueStandings: React.FC = () => {
    const { data: standings, loading, error } = useApiData<StandingsRow[]>('/league/standings', []);

    if (loading) {
        return <p style={{ color: 'var(--color-text-muted)' }}>Loading standings…</p>;
    }

    if (error) {
        return <p className="has-text-danger">Couldn't load standings: {error}</p>;
    }

    return (
        <div className="card-surface table-scroll">
            <table className="table is-fullwidth is-striped mb-0">
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
                        <tr key={row.rank + row.teamName} className={row.teamName === MY_TEAM_NAME ? 'own-team-row' : ''}>
                            <td>{row.rank}</td>
                            <td className="has-text-weight-semibold">{row.teamName}</td>
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
        </div>
    );
};

export default LeagueStandings;

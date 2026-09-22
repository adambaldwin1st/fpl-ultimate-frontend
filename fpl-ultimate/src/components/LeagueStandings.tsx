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
        <>
            <div className="card-surface table-scroll is-hidden-mobile" style={{ padding: '8px 4px' }}>
                <table className="table is-fullwidth mb-0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Team</th>
                            <th>Manager</th>
                            <th>P</th>
                            <th>W-L-D</th>
                            <th>PF</th>
                            <th>PA</th>
                            <th>Pts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {standings.map((row) => (
                            <tr key={row.rank + row.teamName} className={row.teamName === MY_TEAM_NAME ? 'own-team-row' : ''}>
                                <td style={{ color: 'var(--color-text-muted)', fontWeight: 700 }}>{row.rank}</td>
                                <td className="has-text-weight-semibold">{row.teamName}</td>
                                <td style={{ color: 'var(--color-text-muted)' }}>{row.managerName}</td>
                                <td>{row.played}</td>
                                <td>
                                    {row.won}-{row.lost}-{row.drawn}
                                </td>
                                <td>{row.pointsFor}</td>
                                <td>{row.pointsAgainst}</td>
                                <td style={{ fontWeight: 800, color: 'var(--color-accent)' }}>{row.leaguePoints}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="card-surface is-hidden-tablet" style={{ overflow: 'hidden' }}>
                {standings.map((row) => (
                    <div
                        key={row.rank + row.teamName}
                        className={`is-flex is-align-items-center ${row.teamName === MY_TEAM_NAME ? 'own-team-row' : ''}`}
                        style={{
                            padding: '11px 14px',
                            borderBottom: '1px solid var(--color-border)',
                            borderLeft: `3px solid ${row.teamName === MY_TEAM_NAME ? 'var(--color-accent)' : 'transparent'}`,
                        }}
                    >
                        <span style={{ width: '22px', fontSize: '13px', fontWeight: 700, color: 'var(--color-text-muted)' }}>
                            {row.rank}
                        </span>
                        <div style={{ flexGrow: 1, minWidth: 0 }}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {row.teamName}
                            </p>
                            <p style={{ margin: 0, fontSize: '11px', color: 'var(--color-text-muted)' }}>
                                {row.managerName} · {row.won}-{row.lost}-{row.drawn}
                            </p>
                        </div>
                        <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-accent)' }}>{row.leaguePoints}</span>
                    </div>
                ))}
            </div>
        </>
    );
};

export default LeagueStandings;

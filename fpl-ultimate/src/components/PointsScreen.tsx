import React, { useMemo, useState } from 'react';
import { useApiData } from '../hooks/useApiData';
import { Matchup } from '../types/league';
import { GameweekPointsResponse, PlayerGameweekPoint } from '../types/gameweekPoints';
import { MY_TEAM_NAME } from '../config';
import { getStoredTeam, setStoredTeam } from '../storage';
import TeamRoster from './TeamRoster';
import PlayerModal from './PlayerModal';

const PointsScreen: React.FC = () => {
    const { data: matchups, loading: matchupsLoading } = useApiData<Matchup[]>('/league/current-matchups', []);
    const [selectedTeam, setSelectedTeam] = useState<string>(() => getStoredTeam() || MY_TEAM_NAME);
    const [activePlayer, setActivePlayer] = useState<PlayerGameweekPoint | null>(null);

    const teamNames = useMemo(() => {
        const names = new Set<string>();
        matchups.forEach((m) => {
            names.add(m.homeTeamName);
            names.add(m.awayTeamName);
        });
        return Array.from(names).sort();
    }, [matchups]);

    const selectTeam = (teamName: string) => {
        setSelectedTeam(teamName);
        setStoredTeam(teamName);
    };

    const currentMatchupIndex = matchups.findIndex(
        (m) => m.homeTeamName === selectedTeam || m.awayTeamName === selectedTeam
    );

    const goToMatchup = (offset: number) => {
        if (matchups.length === 0) {
            return;
        }
        const nextIndex = (((currentMatchupIndex + offset) % matchups.length) + matchups.length) % matchups.length;
        selectTeam(matchups[nextIndex].homeTeamName);
    };

    const { data: points, loading: pointsLoading, error } = useApiData<GameweekPointsResponse | null>(
        `/league/gameweek-points?team=${encodeURIComponent(selectedTeam)}`,
        null
    );

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem' }}>
            <div className="is-flex is-justify-content-space-between is-align-items-center mb-4">
                <button className="button is-white" onClick={() => goToMatchup(-1)} disabled={matchupsLoading} aria-label="Previous matchup">
                    <span className="icon">
                        <i className="fas fa-chevron-left"></i>
                    </span>
                </button>

                <div className="select">
                    <select value={selectedTeam} onChange={(e) => selectTeam(e.target.value)}>
                        {teamNames.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>

                <button className="button is-white" onClick={() => goToMatchup(1)} disabled={matchupsLoading} aria-label="Next matchup">
                    <span className="icon">
                        <i className="fas fa-chevron-right"></i>
                    </span>
                </button>
            </div>

            {pointsLoading && <p style={{ color: 'var(--color-text-muted)' }}>Loading points…</p>}
            {error && <p className="has-text-danger">Couldn't load points: {error}</p>}

            {points && (
                <>
                    <div className="card-surface p-5 mb-5">
                        <p className="has-text-centered has-text-weight-semibold mb-4" style={{ color: 'var(--color-text-muted)' }}>
                            Gameweek {points.gameweek}
                        </p>
                        <div className="columns is-mobile is-vcentered">
                            <div className="column has-text-centered">
                                <p className="title is-5 has-text-primary mb-1">{points.selectedTeam.teamName}</p>
                                <p className="is-size-7 mb-2" style={{ color: 'var(--color-text-muted)' }}>
                                    {points.selectedTeam.managerName}
                                </p>
                                <p className="title is-2">{points.selectedTeam.totalPoints}</p>
                            </div>
                            <div className="column is-narrow has-text-centered">
                                <p className="subtitle is-6" style={{ color: 'var(--color-text-muted)' }}>
                                    vs
                                </p>
                            </div>
                            <div className="column has-text-centered">
                                <p className="title is-5 mb-1">{points.opponentTeam.teamName}</p>
                                <p className="is-size-7 mb-2" style={{ color: 'var(--color-text-muted)' }}>
                                    {points.opponentTeam.managerName}
                                </p>
                                <p className="title is-2">{points.opponentTeam.totalPoints}</p>
                            </div>
                        </div>
                    </div>

                    <div className="columns">
                        <div className="column">
                            <TeamRoster team={points.selectedTeam} onSelectPlayer={setActivePlayer} />
                        </div>
                        <div className="column">
                            <TeamRoster team={points.opponentTeam} onSelectPlayer={setActivePlayer} />
                        </div>
                    </div>
                </>
            )}

            <PlayerModal player={activePlayer} onClose={() => setActivePlayer(null)} />
        </div>
    );
};

export default PointsScreen;

import React, { useMemo, useState } from 'react';
import { useApiData } from '../hooks/useApiData';
import { Matchup } from '../types/league';
import { GameweekPointsResponse, PlayerGameweekPoint } from '../types/gameweekPoints';
import { MY_TEAM_NAME } from '../config';
import { getStoredTeam, setStoredTeam } from '../storage';
import MatchupRoster from './MatchupRoster';
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
            <div className="is-flex is-align-items-center is-justify-content-center" style={{ gap: '16px', marginBottom: '24px' }}>
                <button
                    className="icon-button"
                    onClick={() => goToMatchup(-1)}
                    disabled={matchupsLoading}
                    aria-label="Previous matchup"
                >
                    <i className="fas fa-chevron-left"></i>
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

                <button
                    className="icon-button"
                    onClick={() => goToMatchup(1)}
                    disabled={matchupsLoading}
                    aria-label="Next matchup"
                >
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>

            {pointsLoading && <p style={{ color: 'var(--color-text-muted)' }}>Loading points…</p>}
            {error && <p className="has-text-danger">Couldn't load points: {error}</p>}

            {points && (
                <>
                    <div className="card-surface" style={{ padding: '28px', marginBottom: '28px' }}>
                        <p className="has-text-centered has-text-weight-semibold mb-4" style={{ color: 'var(--color-text-muted)' }}>
                            Gameweek {points.gameweek}
                        </p>
                        <div className="is-flex is-align-items-center is-justify-content-center">
                            <div className="has-text-centered" style={{ flex: 1 }}>
                                <p style={{ margin: '0 0 4px', fontSize: '17px', fontWeight: 700, color: 'var(--color-accent)' }}>
                                    {points.selectedTeam.teamName}
                                </p>
                                <p style={{ margin: '0 0 10px', fontSize: '13px', color: 'var(--color-text-muted)' }}>
                                    {points.selectedTeam.managerName}
                                </p>
                                <p style={{ margin: 0, fontSize: '44px', fontWeight: 800 }}>{points.selectedTeam.totalPoints}</p>
                            </div>
                            <span style={{ fontSize: '15px', color: 'var(--color-text-muted)', padding: '0 16px', flexShrink: 0 }}>vs</span>
                            <div className="has-text-centered" style={{ flex: 1 }}>
                                <p style={{ margin: '0 0 4px', fontSize: '17px', fontWeight: 700 }}>{points.opponentTeam.teamName}</p>
                                <p style={{ margin: '0 0 10px', fontSize: '13px', color: 'var(--color-text-muted)' }}>
                                    {points.opponentTeam.managerName}
                                </p>
                                <p style={{ margin: 0, fontSize: '44px', fontWeight: 800 }}>{points.opponentTeam.totalPoints}</p>
                            </div>
                        </div>
                    </div>

                    <MatchupRoster
                        selectedTeam={points.selectedTeam}
                        opponentTeam={points.opponentTeam}
                        onSelectPlayer={setActivePlayer}
                    />
                </>
            )}

            <PlayerModal player={activePlayer} onClose={() => setActivePlayer(null)} />
        </div>
    );
};

export default PointsScreen;

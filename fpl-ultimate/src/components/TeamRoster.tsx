import React from 'react';
import { TeamGameweekPoints, PlayerGameweekPoint } from '../types/gameweekPoints';

interface TeamRosterProps {
    team: TeamGameweekPoints;
    onSelectPlayer: (player: PlayerGameweekPoint) => void;
}

const TeamRoster: React.FC<TeamRosterProps> = ({ team, onSelectPlayer }) => {
    let lastPositionType: string | null = null;
    let benchHeadingShown = false;

    return (
        <div className="card-surface mb-5">
            <p className="has-text-weight-semibold p-3 mb-0" style={{ borderBottom: '1px solid var(--color-border)' }}>
                {team.teamName}
            </p>
            {team.players.map((player) => {
                const showPositionHeading = player.isStarter && player.positionType !== lastPositionType;
                if (player.isStarter) {
                    lastPositionType = player.positionType;
                }

                const showBenchHeading = !player.isStarter && !benchHeadingShown;
                if (showBenchHeading) {
                    benchHeadingShown = true;
                }

                return (
                    <React.Fragment key={player.squadPosition}>
                        {showPositionHeading && (
                            <p
                                className="is-size-7 has-text-weight-semibold px-3 pt-3 pb-1 mb-0"
                                style={{ color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-border)' }}
                            >
                                {player.positionType}
                            </p>
                        )}
                        {showBenchHeading && (
                            <p
                                className="is-size-7 has-text-weight-semibold px-3 pt-3 pb-1 mb-0"
                                style={{ color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-border)' }}
                            >
                                Bench
                            </p>
                        )}
                        <div
                            className="is-flex is-justify-content-space-between is-align-items-center px-3 py-2"
                            style={{ cursor: 'pointer' }}
                            onClick={() => onSelectPlayer(player)}
                        >
                            <span>{player.name}</span>
                            {player.started ? (
                                <span className="tag is-primary is-light">{player.points} pts</span>
                            ) : (
                                <span className="is-size-7" style={{ color: 'var(--color-text-muted)' }}>
                                    {player.opponent} {player.isHome ? '(H)' : '(A)'}
                                </span>
                            )}
                        </div>
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default TeamRoster;

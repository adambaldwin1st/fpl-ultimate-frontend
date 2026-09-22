import React from 'react';
import { TeamGameweekPoints, PlayerGameweekPoint } from '../types/gameweekPoints';

interface MatchupRosterProps {
    selectedTeam: TeamGameweekPoints;
    opponentTeam: TeamGameweekPoints;
    onSelectPlayer: (player: PlayerGameweekPoint) => void;
}

interface PairedRow {
    isHeading: boolean;
    headingText?: string;
    home?: PlayerGameweekPoint;
    away?: PlayerGameweekPoint;
}

function buildPairedRows(home: PlayerGameweekPoint[], away: PlayerGameweekPoint[]): PairedRow[] {
    const rows: PairedRow[] = [];
    let lastPosition: string | null = null;
    let benchShown = false;
    const length = Math.max(home.length, away.length);

    for (let i = 0; i < length; i++) {
        const homePlayer = home[i];
        const awayPlayer = away[i];
        const reference = homePlayer ?? awayPlayer;

        if (reference.isStarter && reference.positionType !== lastPosition) {
            rows.push({ isHeading: true, headingText: reference.positionType });
            lastPosition = reference.positionType;
        }
        if (!reference.isStarter && !benchShown) {
            rows.push({ isHeading: true, headingText: 'Bench' });
            benchShown = true;
        }

        rows.push({ isHeading: false, home: homePlayer, away: awayPlayer });
    }

    return rows;
}

const badgeColor = (player?: PlayerGameweekPoint) =>
    player?.started ? 'var(--color-accent)' : 'var(--color-text-muted)';

const badgeText = (player?: PlayerGameweekPoint) => (player?.started ? String(player.points) : '–');

const MatchupRoster: React.FC<MatchupRosterProps> = ({ selectedTeam, opponentTeam, onSelectPlayer }) => {
    const rows = buildPairedRows(selectedTeam.players, opponentTeam.players);

    return (
        <div className="card-surface" style={{ maxWidth: '680px', margin: '0 auto', overflow: 'hidden' }}>
            <div className="is-flex is-align-items-center" style={{ padding: '14px 20px', borderBottom: '1px solid var(--color-border)' }}>
                <span
                    style={{
                        flex: 1,
                        minWidth: 0,
                        textAlign: 'right',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: 'var(--color-accent)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {selectedTeam.teamName}
                </span>
                <span style={{ width: '40px' }} />
                <span style={{ width: '1px' }} />
                <span style={{ width: '40px' }} />
                <span
                    style={{
                        flex: 1,
                        minWidth: 0,
                        textAlign: 'left',
                        fontSize: '13px',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {opponentTeam.teamName}
                </span>
            </div>

            {rows.map((row, i) =>
                row.isHeading ? (
                    <p
                        key={`heading-${i}`}
                        style={{
                            margin: 0,
                            fontSize: '11px',
                            fontWeight: 700,
                            color: 'var(--color-text-muted)',
                            padding: '10px 0 4px',
                            borderTop: '1px solid var(--color-border)',
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                        }}
                    >
                        {row.headingText}
                    </p>
                ) : (
                    <div key={`row-${i}`} className="is-flex is-align-items-center" style={{ gap: '8px', padding: '8px 20px' }}>
                        <span
                            onClick={() => row.home && onSelectPlayer(row.home)}
                            style={{
                                flex: 1,
                                minWidth: 0,
                                textAlign: 'right',
                                fontSize: '14px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                cursor: 'pointer',
                            }}
                        >
                            {row.home?.name}
                        </span>
                        <span
                            onClick={() => row.home && onSelectPlayer(row.home)}
                            style={{ width: '40px', textAlign: 'center', fontSize: '14px', fontWeight: 800, color: badgeColor(row.home), cursor: 'pointer' }}
                        >
                            {badgeText(row.home)}
                        </span>
                        <span style={{ width: '1px', height: '18px', background: 'var(--color-border)' }} />
                        <span
                            onClick={() => row.away && onSelectPlayer(row.away)}
                            style={{ width: '40px', textAlign: 'center', fontSize: '14px', fontWeight: 800, color: badgeColor(row.away), cursor: 'pointer' }}
                        >
                            {badgeText(row.away)}
                        </span>
                        <span
                            onClick={() => row.away && onSelectPlayer(row.away)}
                            style={{
                                flex: 1,
                                minWidth: 0,
                                textAlign: 'left',
                                fontSize: '14px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                cursor: 'pointer',
                            }}
                        >
                            {row.away?.name}
                        </span>
                    </div>
                )
            )}
        </div>
    );
};

export default MatchupRoster;

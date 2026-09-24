import React from 'react';
import { TeamGameweekPoints, PlayerGameweekPoint } from '../types/gameweekPoints';
import { getClubCrestUrl } from '../clubCrests';

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

const badgeText = (player?: PlayerGameweekPoint) => {
    if (!player) {
        return '';
    }
    return player.started ? String(player.points) : `${player.opponent}(${player.isHome ? 'H' : 'A'})`;
};

const badgeFontSize = (player?: PlayerGameweekPoint) => (player?.started ? '14px' : '11px');

const RosterPlayerCell: React.FC<{
    player?: PlayerGameweekPoint;
    align: 'left' | 'right';
    onSelect: () => void;
}> = ({ player, align, onSelect }) => {
    if (!player) {
        return <div style={{ flex: 1, minWidth: 0 }} />;
    }

    const crestUrl = getClubCrestUrl(player.club);
    const isRight = align === 'right';

    return (
        <div
            onClick={onSelect}
            style={{
                flex: 1,
                minWidth: 0,
                display: 'flex',
                flexDirection: isRight ? 'row-reverse' : 'row',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
            }}
        >
            {crestUrl ? (
                <img
                    src={crestUrl}
                    alt={player.club}
                    style={{ width: '16px', height: '16px', objectFit: 'contain', flexShrink: 0 }}
                />
            ) : (
                <span style={{ width: '16px', height: '16px', flexShrink: 0 }} />
            )}
            <span
                style={{
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    minWidth: 0,
                }}
            >
                {player.name}
            </span>
        </div>
    );
};

const MatchupRoster: React.FC<MatchupRosterProps> = ({ selectedTeam, opponentTeam, onSelectPlayer }) => {
    const rows = buildPairedRows(selectedTeam.players, opponentTeam.players);

    return (
        <div className="card-surface" style={{ maxWidth: '760px', margin: '0 auto', overflow: 'hidden' }}>
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
                <span style={{ width: '56px' }} />
                <span style={{ width: '1px' }} />
                <span style={{ width: '56px' }} />
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
                        <RosterPlayerCell player={row.home} align="right" onSelect={() => row.home && onSelectPlayer(row.home)} />
                        <span
                            onClick={() => row.home && onSelectPlayer(row.home)}
                            style={{
                                width: '56px',
                                flexShrink: 0,
                                textAlign: 'center',
                                fontSize: badgeFontSize(row.home),
                                fontWeight: 800,
                                color: badgeColor(row.home),
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {badgeText(row.home)}
                        </span>
                        <span style={{ width: '1px', height: '18px', background: 'var(--color-border)', flexShrink: 0 }} />
                        <span
                            onClick={() => row.away && onSelectPlayer(row.away)}
                            style={{
                                width: '56px',
                                flexShrink: 0,
                                textAlign: 'center',
                                fontSize: badgeFontSize(row.away),
                                fontWeight: 800,
                                color: badgeColor(row.away),
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {badgeText(row.away)}
                        </span>
                        <RosterPlayerCell player={row.away} align="left" onSelect={() => row.away && onSelectPlayer(row.away)} />
                    </div>
                )
            )}
        </div>
    );
};

export default MatchupRoster;

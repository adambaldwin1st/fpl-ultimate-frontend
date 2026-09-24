import React from 'react';
import { TeamGameweekPoints, PlayerGameweekPoint } from '../types/gameweekPoints';
import { getClubCrestUrl } from '../clubCrests';

interface PitchRosterProps {
    team: TeamGameweekPoints;
    onSelectPlayer: (player: PlayerGameweekPoint) => void;
}

const POSITION_ORDER: PlayerGameweekPoint['positionType'][] = ['GKP', 'DEF', 'MID', 'FWD'];

// Same pitch graphic draft.premierleague.com's own Points > Pitch View uses.
// Hosted on their app's hashed asset bundle, not a stable CDN path - could break
// on their next deploy, unlike the badge crests (resources.premierleague.com).
const PITCH_BACKGROUND_URL = 'https://draft.premierleague.com/assets/pitch-default-CfeFC5Ls.svg';

const PitchMarker: React.FC<{ player: PlayerGameweekPoint; onSelect: () => void }> = ({ player, onSelect }) => {
    const crestUrl = getClubCrestUrl(player.club);

    return (
        <button
            onClick={onSelect}
            aria-label={`${player.name} (${player.club})`}
            style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '5px',
                width: '78px',
            }}
        >
            {crestUrl ? (
                <img
                    src={crestUrl}
                    alt={player.club}
                    style={{ width: '38px', height: '38px', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.35))' }}
                />
            ) : (
                <div
                    style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: 'var(--color-surface-alt)',
                        border: '1px solid var(--color-border)',
                    }}
                />
            )}
            <span
                style={{
                    background: 'rgba(15, 12, 26, 0.85)',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    maxWidth: '78px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}
            >
                {player.name}
            </span>
            <span
                style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: player.started ? 'var(--color-accent)' : 'rgba(255,255,255,0.6)',
                    whiteSpace: 'nowrap',
                }}
            >
                {player.started ? player.points : `${player.opponent}(${player.isHome ? 'H' : 'A'})`}
            </span>
        </button>
    );
};

const PitchRoster: React.FC<PitchRosterProps> = ({ team, onSelectPlayer }) => {
    const starters = team.players.filter((p) => p.isStarter);
    const bench = team.players.filter((p) => !p.isStarter);

    return (
        <div className="card-surface" style={{ overflow: 'hidden', marginBottom: '24px' }}>
            <p
                style={{
                    margin: 0,
                    padding: '12px 16px',
                    fontWeight: 700,
                    borderBottom: '1px solid var(--color-border)',
                }}
            >
                {team.teamName}
            </p>

            <div
                style={{
                    background: `#14522b url(${PITCH_BACKGROUND_URL}) center / cover no-repeat`,
                    padding: '24px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '22px',
                }}
            >
                {POSITION_ORDER.map((position) => {
                    const rowPlayers = starters.filter((p) => p.positionType === position);
                    if (rowPlayers.length === 0) {
                        return null;
                    }
                    return (
                        <div
                            key={position}
                            style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}
                        >
                            {rowPlayers.map((player) => (
                                <PitchMarker key={player.squadPosition} player={player} onSelect={() => onSelectPlayer(player)} />
                            ))}
                        </div>
                    );
                })}
            </div>

            {bench.length > 0 && (
                <div
                    style={{
                        padding: '16px 12px',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '10px',
                        flexWrap: 'wrap',
                        borderTop: '1px solid var(--color-border)',
                        background: 'var(--color-surface-alt)',
                    }}
                >
                    {bench.map((player) => (
                        <PitchMarker key={player.squadPosition} player={player} onSelect={() => onSelectPlayer(player)} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PitchRoster;

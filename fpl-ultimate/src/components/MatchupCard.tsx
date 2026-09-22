import React from 'react';
import { Matchup } from '../types/league';
import { MY_TEAM_NAME } from '../config';

interface MatchupCardProps {
    matchup: Matchup;
}

const MatchupCard: React.FC<MatchupCardProps> = ({ matchup }) => {
    const isMyHome = matchup.homeTeamName === MY_TEAM_NAME;
    const isMyAway = matchup.awayTeamName === MY_TEAM_NAME;
    const isDraw = matchup.finished && matchup.homeScore === matchup.awayScore;

    const badgeText = matchup.finished ? (isDraw ? 'FINAL — DRAW' : 'FINAL') : 'LIVE';
    const badgeBg = matchup.finished ? 'var(--color-border)' : 'rgba(34,197,94,0.16)';
    const badgeColor = matchup.finished ? '#c9c4de' : 'var(--color-accent)';

    return (
        <div className="card-surface" style={{ padding: '16px' }}>
            <div className="is-flex is-align-items-center" style={{ gap: '8px', marginBottom: '10px' }}>
                <span
                    style={{
                        flex: 1,
                        minWidth: 0,
                        textAlign: 'right',
                        fontSize: '12px',
                        fontWeight: isMyHome ? 800 : 600,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {matchup.homeTeamName}
                </span>
                <span style={{ flexShrink: 0, fontSize: '16px', fontWeight: 800, whiteSpace: 'nowrap' }}>
                    {matchup.homeScore} - {matchup.awayScore}
                </span>
                <span
                    style={{
                        flex: 1,
                        minWidth: 0,
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: isMyAway ? 800 : 600,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {matchup.awayTeamName}
                </span>
            </div>
            <div className="has-text-centered">
                <span
                    style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '20px',
                        background: badgeBg,
                        color: badgeColor,
                    }}
                >
                    {badgeText}
                </span>
            </div>
        </div>
    );
};

export default MatchupCard;

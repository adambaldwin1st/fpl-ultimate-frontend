import React from 'react';
import { Matchup } from '../types/league';
import { MY_TEAM_NAME } from '../config';

interface MatchupCardProps {
    matchup: Matchup;
    featured?: boolean;
}

const MatchupCard: React.FC<MatchupCardProps> = ({ matchup, featured = false }) => {
    const isMyHome = matchup.homeTeamName === MY_TEAM_NAME;
    const isMyAway = matchup.awayTeamName === MY_TEAM_NAME;

    if (featured) {
        return (
            <div className="card-surface p-5 mb-5">
                <p className="has-text-centered has-text-weight-semibold mb-4" style={{ color: 'var(--color-text-muted)' }}>
                    Gameweek {matchup.gameweek} · {matchup.finished ? 'Final' : 'Live'}
                </p>
                <div className="columns is-mobile is-vcentered">
                    <div className="column has-text-centered">
                        <p className={`title is-5 ${isMyHome ? 'has-text-primary' : ''}`}>{matchup.homeTeamName}</p>
                        <p className="title is-2">{matchup.homeScore}</p>
                    </div>
                    <div className="column is-narrow has-text-centered">
                        <p className="subtitle is-6" style={{ color: 'var(--color-text-muted)' }}>vs</p>
                    </div>
                    <div className="column has-text-centered">
                        <p className={`title is-5 ${isMyAway ? 'has-text-primary' : ''}`}>{matchup.awayTeamName}</p>
                        <p className="title is-2">{matchup.awayScore}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="column is-half-tablet is-full-mobile">
            <div className="card-surface box">
                <p className="has-text-weight-semibold is-size-7" style={{ color: 'var(--color-text-muted)' }}>
                    Gameweek {matchup.gameweek}
                </p>
                <div className="level is-mobile mt-2 mb-0">
                    <div className="level-left">
                        <span className={isMyHome ? 'has-text-primary has-text-weight-semibold' : ''}>{matchup.homeTeamName}</span>
                    </div>
                    <div className="level-right">
                        <span className="tag is-medium">
                            {matchup.homeScore} - {matchup.awayScore}
                        </span>
                    </div>
                </div>
                <p className={isMyAway ? 'has-text-primary has-text-weight-semibold' : ''}>{matchup.awayTeamName}</p>
                <p className="is-size-7 mt-2" style={{ color: 'var(--color-text-muted)' }}>
                    {matchup.finished ? 'Final' : 'Live'}
                </p>
            </div>
        </div>
    );
};

export default MatchupCard;

import React from 'react';
import { PlayerGameweekPoint } from '../types/gameweekPoints';

interface PlayerModalProps {
    player: PlayerGameweekPoint | null;
    onClose: () => void;
}

const PlayerModal: React.FC<PlayerModalProps> = ({ player, onClose }) => {
    if (!player) {
        return null;
    }

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-card" style={{ borderRadius: '14px', overflow: 'hidden' }}>
                <header className="modal-card-head" style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <p className="modal-card-title">{player.name}</p>
                    <button className="delete" aria-label="close" onClick={onClose}></button>
                </header>
                <section className="modal-card-body">
                    {player.started ? (
                        <>
                            <p className="mb-4" style={{ fontSize: '15px', fontWeight: 700 }}>
                                Total: {player.points} pts
                            </p>
                            {player.breakdown.length > 0 ? (
                                player.breakdown.map((stat, i) => (
                                    <div
                                        key={i}
                                        className="is-flex is-align-items-center is-justify-content-space-between"
                                        style={{ padding: '8px 0', borderTop: '1px solid var(--color-border)', fontSize: '14px' }}
                                    >
                                        <span>
                                            {stat.name} ({stat.value})
                                        </span>
                                        <span style={{ fontWeight: 700 }}>
                                            {stat.points > 0 ? '+' : ''}
                                            {stat.points}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p style={{ color: 'var(--color-text-muted)' }}>No scoring stats recorded.</p>
                            )}
                        </>
                    ) : (
                        <p style={{ color: 'var(--color-text-muted)' }}>
                            Hasn't played yet — faces {player.opponent} ({player.isHome ? 'H' : 'A'}).
                        </p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default PlayerModal;

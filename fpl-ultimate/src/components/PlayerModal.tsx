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
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{player.name}</p>
                    <button className="delete" aria-label="close" onClick={onClose}></button>
                </header>
                <section className="modal-card-body">
                    {player.started ? (
                        <>
                            <p className="mb-4">
                                <strong>Total: {player.points} pts</strong>
                            </p>
                            {player.breakdown.length > 0 ? (
                                <table className="table is-fullwidth">
                                    <tbody>
                                        {player.breakdown.map((stat, i) => (
                                            <tr key={i}>
                                                <td>
                                                    {stat.name} ({stat.value})
                                                </td>
                                                <td className="has-text-right">
                                                    {stat.points > 0 ? '+' : ''}
                                                    {stat.points}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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

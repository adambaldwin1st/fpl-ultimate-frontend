import React, { useState } from 'react';

const NavBar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar" style={{ backgroundColor: 'var(--color-primary)' }} role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <img src="/images/PLWhiteOutline.png" alt="Logo" style={{ maxHeight: '2rem' }} />
                    <span className="has-text-white has-text-weight-bold ml-2">FPL Ultimate</span>
                </a>

                <button
                    className={`navbar-burger ${menuOpen ? 'is-active' : ''}`}
                    aria-label="menu"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((open) => !open)}
                    style={{ color: '#fff', background: 'none', border: 'none' }}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </button>
            </div>

            <div className={`navbar-menu ${menuOpen ? 'is-active' : ''}`} style={{ backgroundColor: 'var(--color-primary)' }}>
                <div className="navbar-start">
                    <a href="/" className="navbar-item has-text-white has-text-weight-semibold">
                        <span className="icon">
                            <i className="fas fa-trophy"></i>
                        </span>
                        <span>Leagues</span>
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;

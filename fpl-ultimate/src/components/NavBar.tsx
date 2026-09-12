import React, { useState } from 'react';
import { Tab } from '../types/navigation';

interface NavBarProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
}

const NavBar: React.FC<NavBarProps> = ({ activeTab, onTabChange }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleTabClick = (tab: Tab) => (e: React.MouseEvent) => {
        e.preventDefault();
        onTabChange(tab);
        setMenuOpen(false);
    };

    const tabClass = (tab: Tab) =>
        `navbar-item has-text-white ${activeTab === tab ? 'has-text-weight-bold' : ''}`;

    return (
        <nav className="navbar" style={{ backgroundColor: 'var(--color-primary)' }} role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/" onClick={handleTabClick('points')}>
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
                    <a href="/" className={tabClass('points')} onClick={handleTabClick('points')}>
                        <span className="icon">
                            <i className="fas fa-futbol"></i>
                        </span>
                        <span>Points</span>
                    </a>
                    <a href="/" className={tabClass('league-table')} onClick={handleTabClick('league-table')}>
                        <span className="icon">
                            <i className="fas fa-trophy"></i>
                        </span>
                        <span>League Table</span>
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;

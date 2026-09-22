import React, { useState } from 'react';
import { Tab } from '../types/navigation';

interface NavBarProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
}

const TABS: { tab: Tab; label: string }[] = [
    { tab: 'league-table', label: 'League Table' },
    { tab: 'points', label: 'My Team' },
];

const NavBar: React.FC<NavBarProps> = ({ activeTab, onTabChange }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleTabClick = (tab: Tab) => (e: React.MouseEvent) => {
        e.preventDefault();
        onTabChange(tab);
        setMenuOpen(false);
    };

    return (
        <nav
            role="navigation"
            aria-label="main navigation"
            style={{ background: 'linear-gradient(90deg, #4c1d95 0%, #1e3a8a 100%)' }}
        >
            <div
                className="is-flex is-align-items-center is-justify-content-space-between"
                style={{ height: '64px', padding: '0 24px' }}
            >
                <div className="is-flex is-align-items-center" style={{ gap: '24px' }}>
                    <div className="is-flex is-align-items-center" style={{ gap: '10px' }}>
                        <div
                            className="is-flex is-align-items-center is-justify-content-center"
                            style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.15)' }}
                        >
                            <span style={{ color: 'var(--color-accent)', fontWeight: 800, fontSize: '13px' }}>FU</span>
                        </div>
                        <span style={{ color: '#fff', fontWeight: 700, fontSize: '16px' }}>FPL Ultimate</span>
                    </div>

                    <div className="is-hidden-mobile is-flex" style={{ gap: '4px' }}>
                        {TABS.map(({ tab, label }) => (
                            <a
                                key={tab}
                                href="/"
                                onClick={handleTabClick(tab)}
                                style={{
                                    color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.75)',
                                    fontWeight: activeTab === tab ? 700 : 600,
                                    fontSize: '14px',
                                    padding: '10px 14px',
                                    borderBottom: `2px solid ${activeTab === tab ? 'var(--color-blue)' : 'transparent'}`,
                                }}
                            >
                                {label}
                            </a>
                        ))}
                    </div>
                </div>

                <button
                    className={`navbar-burger is-hidden-tablet ${menuOpen ? 'is-active' : ''}`}
                    aria-label="menu"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((open) => !open)}
                    style={{ color: '#fff', background: 'none', border: 'none' }}
                >
                    <span aria-hidden="true" style={{ backgroundColor: '#fff' }}></span>
                    <span aria-hidden="true" style={{ backgroundColor: '#fff' }}></span>
                    <span aria-hidden="true" style={{ backgroundColor: '#fff' }}></span>
                </button>
            </div>

            {menuOpen && (
                <div className="is-hidden-tablet" style={{ background: 'var(--color-surface-alt)', borderTop: '1px solid var(--color-border)' }}>
                    {TABS.map(({ tab, label }) => (
                        <a
                            key={tab}
                            href="/"
                            onClick={handleTabClick(tab)}
                            className="is-block"
                            style={{
                                color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.75)',
                                fontWeight: activeTab === tab ? 700 : 600,
                                fontSize: '14px',
                                padding: '14px 24px',
                                borderLeft: `3px solid ${activeTab === tab ? 'var(--color-blue)' : 'transparent'}`,
                            }}
                        >
                            {label}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default NavBar;

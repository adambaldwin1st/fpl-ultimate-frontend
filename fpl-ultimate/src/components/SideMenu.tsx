import React from 'react';

const SideMenu: React.FC = () => {
    return (
        <aside className="menu is-hidden-mobile side-menu" style={{ backgroundColor: '#1a1a1a', color: '#fff', width: '250px', borderRight: '1px solid #fff' }}>
            <div className="menu-logo has-text-white">
                <img src="/images/PLWhiteOutline.png" alt="Logo" className="menu-logo-img" />
                <p className="menu-label">FPL Ultimate</p>
            </div>
            <ul className="menu-list">
                <li>
                    <a href="/" className="has-text-white">
            <span className="icon">
              <i className="fas fa-trophy"></i>
            </span>
                        Leagues
                    </a>
                </li>
                <li>
                    <a href="/messages" className="has-text-white">
            <span className="icon">
              <i className="fas fa-envelope"></i>
            </span>
                        Messages
                    </a>
                </li>
                <li>
                    <a href="/settings" className="has-text-white">
            <span className="icon">
              <i className="fas fa-cogs"></i>
            </span>
                        Settings
                    </a>
                </li>
            </ul>
        </aside>
    );
};

export default SideMenu;

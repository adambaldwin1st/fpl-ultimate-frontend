import React from 'react';
import LandingPage from './components/LandingPage';
import SideMenu from './components/SideMenu';

import 'bulma/css/bulma.min.css';

function App() {
    return (
        <div className="App" style={{ height: '100vh', display: 'flex' }}>
            <div className="column is-one-fifth">
                <SideMenu />
            </div>
            <div className="column">
                <LandingPage />
            </div>
        </div>
    );
}

export default App;

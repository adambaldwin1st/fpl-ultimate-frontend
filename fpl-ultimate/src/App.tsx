import React from 'react';
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';

import 'bulma/css/bulma.min.css';

function App() {
    return (
        <div className="App">
            <NavBar />
            <LandingPage />
        </div>
    );
}

export default App;

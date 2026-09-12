import React, { useState } from 'react';
import NavBar from './components/NavBar';
import PointsScreen from './components/PointsScreen';
import LeagueTableScreen from './components/LeagueTableScreen';
import { Tab } from './types/navigation';

import 'bulma/css/bulma.min.css';

function App() {
    const [activeTab, setActiveTab] = useState<Tab>('points');

    return (
        <div className="App">
            <NavBar activeTab={activeTab} onTabChange={setActiveTab} />
            {activeTab === 'points' ? <PointsScreen /> : <LeagueTableScreen />}
        </div>
    );
}

export default App;

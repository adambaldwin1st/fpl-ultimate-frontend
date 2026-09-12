import React from 'react';
import LeagueStandings from './LeagueStandings';
import CurrentMatchups from './CurrentMatchups';

const LandingPage: React.FC = () => {
    return (
        <div className="p-4-mobile p-6-tablet" style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem' }}>
            <h2 className="title is-4">This Week's Matchups</h2>
            <CurrentMatchups />

            <h2 className="title is-4 mt-6">League Standings</h2>
            <LeagueStandings />
        </div>
    );
};

export default LandingPage;

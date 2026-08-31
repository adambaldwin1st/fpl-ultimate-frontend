import React from 'react';
import LeagueStandings from './LeagueStandings';
import CurrentMatchups from './CurrentMatchups';

const LandingPage: React.FC = () => {
    return (
        <div className="p-5">
            <h2 className="title is-4">This Week's Matchups</h2>
            <CurrentMatchups />

            <h2 className="title is-4 mt-5">League Standings</h2>
            <LeagueStandings />
        </div>
    );
};

export default LandingPage;

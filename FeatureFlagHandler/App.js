import React from 'react';
import FeatureFlag from './FeatureFlag';
import './App.css';


const Banner = () => {
    return (
        <div className="banner">
            <h1>Welcome to the site!</h1>
        </div>
    );
}

const InfoMessage = () => {
    return (
        <div className="info-message">
            <p>Here is some important information about this feature.</p>
        </div>
    );
}

const App = () => {
    return (
        <div>
            <FeatureFlag flagKey="showBanner">
                <Banner />
            </FeatureFlag>
            <FeatureFlag flagKey="showInfoMessage">
                <InfoMessage />
            </FeatureFlag>
        </div>
    )
};


export default App;

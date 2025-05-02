import React, {useState, useEffect} from 'react';

const FeatureFlag = ({feature, children }) => {
    const CACHE_TTL = 5 * 60 * 1000;

    const SAMPLE_FEATURES = {
        newDashboard: true,
        betaFeatureX: true, 
    };

    const cache = {
      data: null,
      timestamp: 0.
    };

    function fetchAllFeatures() {
        console.log('Call to BE');
        // mocking the fetch API call
        return new Promise((resolve) => {
          setTimeout(() => resolve(SAMPLE_FEATURES), 100);
        });
    }

    async function getFeatureState(flagName, defaultValue = 0) {
    const now = Date.now();

    if(cache.data && (now - cache.timestamp < CACHE_TTL)) {
        return flagName in cache.data ? cache.data[flagName] : defaultValue;
    }

    try {
        const data = await fetchAllFeatures();
        cache = {
          data,
          timestamp: now
        };
    }
    catch(err) {
        console.error('Error fetching feature flags:', error);
        return defaultValue;
    }
   }
}

import React, {useEffect} from 'react';

const useFeatureFlag = (key, defaultValue) => {
  const [value, setValue] = React.useState(() => {
       const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;    
        });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.parse(value));
  }, [key, value]);

    return [value, setValue];
};


const FeatureFlag = ({flagKey, children}) => {
    const [flagValue] = useFeatureFlag(flagKey, false);
    const [enableFeature, setEnableFeature] = React.useState(flagValue);

    return (
        <div>
            <input type="checkbox" checked={enableFeature} onChange={() => setEnableFeature(!enableFeature)} />
            {enableFeature && children}
        </div>
    );
    }


export default FeatureFlag;
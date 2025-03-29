import React, {useState} from 'react';


const TrafficLightSimulation = () => {
    const [activeLight, setActiveLight] = useState("red");

    useEffect(() => {
        let cycle = ["red", "green", "yellow"];
        let index = 0;
    
        const interval = setInterval(() => {
          index = (index + 1) % cycle.length;
          setActiveLight(cycle[index]);
        }, getLightDuration(cycle[index])); // Adjust interval dynamically
    
        return () => clearInterval(interval); // Cleanup on unmount
      }, []);
    
      // Function to get duration for each light
      const getLightDuration = (color) => {
        switch (color) {
          case "red":
            return 4000; // Red for 4s
          case "green":
            return 3000; // Green for 3s
          case "yellow":
            return 1500; // Yellow for 1.5s
          default:
            return 4000;
        }
      };
    
 return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px"}}>
        <div style={{borderRadius: "50%", width: "60px", height: "60px", backgroundColor: "red", opacity: currentColor === 'red' ? '1' : '0.5'}}/>
        <div style={{borderRadius: "50%", width: "60px", height: "60px", backgroundColor: "yellow", opacity: currentColor === 'yellow' ? '1' : '0.5'}}/>
        <div style={{borderRadius: "50%", width: "60px", height: "60px", backgroundColor: "green", opacity: currentColor === 'green' ? '1' : '0.5'}}/>        

    </div>
 );
};

React.render(<TrafficLightSimulation />, document.getElementById('app'));


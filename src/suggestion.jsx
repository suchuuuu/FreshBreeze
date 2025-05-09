import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from './config'; 
import { ref, onValue } from 'firebase/database'; 
import goodImage from './assets/healthy.png';
import moderateImage from './assets/healthy.png';
import unhealthyImage from './assets/unhealthy.png';
import hazardousImage from './assets/hazardous.png';
import './suggestion.css';

const Suggestion = () => {
  const [aqi, setAqi] = useState(null);

  const fetchAqiData = () => {
    const aqiRef = ref(db, 'Sensor/aqi'); 

    onValue(aqiRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Fetched data:", data); 
      const latestAqiValue = Object.values(data).pop(); 
      if (latestAqiValue !== null && !isNaN(latestAqiValue)) {
        setAqi(latestAqiValue);
      } else {
        setAqi(null);
      }
    });
  };

  useEffect(() => {
    fetchAqiData(); 
    const interval = setInterval(() => {
      fetchAqiData(); 
    }, 10000);
    return () => clearInterval(interval); 
  }, []);

  const getSuggestion = () => {
    if (aqi === null) {
      return { suggestion: "Loading AQI data...", image: null, backgroundColor: 'grey' };
    }
    if (aqi <= 100) {
      return { suggestion: "Your AQI is good. It's safe to go outside!", image: goodImage, backgroundColor: '#479745' };
    } else if (aqi <= 200) {
      return { suggestion: "The air quality is moderate. Consider limiting prolonged outdoor activity.", image: unhealthyImage, backgroundColor: 'yellow' };
    } else {
      return { suggestion: "The air quality is hazardous. Stay indoors and wear a mask if necessary!", image: hazardousImage, backgroundColor: 'red' };
    }
  };

  const { suggestion, image, backgroundColor } = getSuggestion();

  return (
    <div className="aqi-container" style={{ backgroundColor }}>
      {aqi !== null ? (
        <>
          <h1>Current AQI: {aqi}</h1>
          <p>{suggestion}</p>
          {image && <img src={image} alt="Air quality" className="aqi-image" />}
        </>
      ) : <p>{suggestion}</p>}
      <Link to="/datainsights">
        <button className="back-button">Back to Dashboard</button>
      </Link>
    </div>
    
  );
};

export default Suggestion;

import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import CO2_photo from './assets/CO2.png';
import CO_photo from './assets/CO.png';
import PM_photo from './assets/PM.png';
import SO2_photo from './assets/SO2.png';
import PollutionImage from './assets/Airpollution.jpg';
import Image1 from './assets/Image1.jpg';
import Image2 from './assets/Image2.jpg';
import Image3 from './assets/image3.jpg';
import WeatherImage from './assets/weather.png';
import HumidityImage from './assets/humidity.png';
import { db, ref, onValue } from './config';
import { CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import './index.css';
import PollutionVideo from './assets/PollutionVideo.mp4';
import Footer from './footer';

const Home = () => {
  const exploreSectionRef = useRef(null);
  const [weatherData, setWeatherData] = useState({ temp: null, humidity: null });
  const [pollutantsData, setPollutantsData] = useState({ CO2: null, CO: null, PM25: null, SO2: null });
  const [aqiData, setAqiData] = useState({});

  useEffect(() => {
    const sensorRef = ref(db, 'Sensor');
    const fetchSensorData = () => {
      onValue(sensorRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const weatherData = data.temperature || {};
          const humidityData = data.humidity || {};
          const lastTempKey = Object.keys(weatherData).pop();
          const lastHumidityKey = Object.keys(humidityData).pop();
          setWeatherData({
            temp: weatherData[lastTempKey] || 'No data',
            humidity: humidityData[lastHumidityKey] || 'No data',
          });

          const lastCO2Key = Object.keys(data.mq135 || {}).pop();
          const lastCOKey = Object.keys(data.mq9 || {}).pop();
          const lastPM25Key = Object.keys(data.dust || {}).pop();
          const lastSO2Key = Object.keys(data.so2 || {}).pop();

          setPollutantsData({
            CO2: data.mq135 ? data.mq135[lastCO2Key] : 'No data',
            CO: data.mq9 ? data.mq9[lastCOKey] : 'No data',
            PM25: data.dust ? data.dust[lastPM25Key] : 'No data',
            SO2: data.so2 ? data.so2[lastSO2Key] : 'No data',
          });
        }
      });
    };

    fetchSensorData();
    const interval = setInterval(fetchSensorData, 900000); // 15 minutes
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchAqiData = async () => {
      try {
        const stations = [
          { name: 'Lalitpur', code: 'A517780' },
          { name: 'Chitwan', code: 'A517774' },
          { name: 'Dang', code: 'A517783' },
        ];

        const responses = await Promise.all(
          stations.map((station) =>
            fetch(`https://api.waqi.info/feed/${station.code}/?token=2a61f5dc463f67033bc1146cd341eed00e1b25b4`)
              .then((res) => res.json())
          )
        );

        const formattedData = {};
        stations.forEach((station, index) => {
          const result = responses[index].data;
          formattedData[station.name] = {
            aqi: result?.aqi ?? 'No data',
          };
        });

        setAqiData(formattedData);
      } catch (error) {
        console.error('Error fetching AQI data:', error);
      }
    };

    fetchAqiData();
  }, []);

  const scrollToSection = () => {
    if (exploreSectionRef.current) {
      exploreSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const aqiChartData = Object.entries(aqiData).map(([station, value]) => ({
    name: station,
    aqi: Number(value.aqi) || 0,
  }));

  return (
    <div>
      <Navbar />
      <p className="fresh-breeze-text">Fresh Breeze</p>

      <div className="weather-container">
        <div className="weather-box">
          <div className="weather-item">
            <img src={WeatherImage} alt="Temperature" className="weather-icon" />
            <p className="weather-text">
              {weatherData.temp !== null ? `${weatherData.temp}°C` : 'Loading...'}
            </p>
          </div>
          <div className="weather-item">
            <img src={HumidityImage} alt="Humidity" className="weather-icon" />
            <p className="weather-text">
              {weatherData.humidity !== null ? `${weatherData.humidity}%` : 'Loading...'}
            </p>
          </div>
        </div>
      </div>

      <div className="description-text">
        Discover actionable insights into pollution by delivering real-time air quality data with dynamic data visualization.
      </div>

      <div className="cta-container">
        <button className="cta-button" onClick={scrollToSection}>Explore More</button>
        <span className="cta-text">Understand Impact →</span>
      </div>

      <div className="rectangle">
        <p className="rectangle-text">Major Air Pollutants</p>
        <div className="rectangle-container">
          <div className="rectangle-box">
            <img src={CO2_photo} alt="CO2" className="box-image" />
            <p className="real-time-value">{pollutantsData.CO2 !== null ? `${pollutantsData.CO2} ppm` : 'Loading...'}</p>
          </div>
          <div className="rectangle-box">
            <img src={CO_photo} alt="CO" className="box-image" />
            <p className="real-time-value">{pollutantsData.CO !== null ? `${pollutantsData.CO} ppm` : 'Loading...'}</p>
          </div>
          <div className="rectangle-box">
            <img src={PM_photo} alt="PM2.5" className="box-image" />
            <p className="real-time-value">{pollutantsData.PM25 !== null ? `${pollutantsData.PM25} µg/m³` : 'Loading...'}</p>
          </div>
          <div className="rectangle-box">
            <img src={SO2_photo} alt="SO2" className="box-image" />
            <p className="real-time-value">{pollutantsData.SO2 !== null ? `${pollutantsData.SO2} pbm` : 'Loading...'}</p>
          </div>
        </div>
      </div>

      <div className="section-container" ref={exploreSectionRef}>
        <div className="image-section">
          <video
            className="new-image"
            src={PollutionVideo}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
        <div className="text-section">
          <h2>Real-Time Air Quality Monitoring</h2>
          <p>
            Our IoT sensors provide accurate, real-time data on pollution levels, empowering you
            to make informed decisions for a healthier environment. Track pollution and view trends.
          </p>
          <div className="button-container">
            <Link to="/datainsights">
              <button className="monitorbutton">Monitor Air Now</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="benefits-container">
        <h2 className="benefits">Benefits of FreshBreeze</h2>
        <p className="benefits-description">Explore how FreshBreeze contributes to better health and environmental awareness.</p>
        <div className="benefits-images-container">
          <div className="benefit-image-box">
            <img src={Image1} alt="Cleaner Air" className="benefit-image" />
            <p className="image-caption">Cleaner Air</p>
          </div>
          <div className="benefit-image-box">
            <img src={Image2} alt="Improved Health" className="benefit-image" />
            <p className="image-caption">Improved Health</p>
          </div>
          <div className="benefit-image-box">
            <img src={Image3} alt="Environmental Safety" className="benefit-image" />
            <p className="image-caption">Environmental Safety</p>
          </div>
        </div>
      </div>

      <div className="aqi-section">
        <h2 className="aqi-title">Air Quality Index (AQI) of different places</h2>
        <div className="aqi-region-container">
          {Object.keys(aqiData).map((station) => (
            <div key={station} className="aqi-region-box"></div>
          ))}
        </div>

        <div className="aqi-graph-container" color='solid white'>
          <BarChart width={900} height={200} data={aqiChartData} layout="vertical" margin={{ right: 30, left: 90, bottom: 7 }}>
            <CartesianGrid stroke="#E7DECC" />
            <XAxis type="number" stroke='#E7DECC' ticks={[0, 100, 200, 300, 400]} domain={[0, 500]} />
            <YAxis dataKey="name" type="category" stroke='#E7DECC' />
            <Tooltip />
            <Bar dataKey="aqi" fill="#B56727" />
          </BarChart>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;

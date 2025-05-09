import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { db, ref, onValue } from './config';
import './Datainsight.css';
import Footer from './Footer';

const DataInsight = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const sensorRef = ref(db, 'Sensor');
      onValue(sensorRef, (snapshot) => {
        const sensorData = snapshot.val();
        if (!sensorData) return;

        const timestamps = Object.keys(sensorData.aqi);
        const formattedData = timestamps.map((timestamp) => ({
          time: timestamp,
          co2: sensorData.mq135?.[timestamp] ?? null,
          co: sensorData.mq9?.[timestamp] ?? null,
          pm25: sensorData.dust?.[timestamp] ?? null,
          so2: sensorData.so2?.[timestamp] ?? null,
        }));

        formattedData.sort((a, b) => new Date(a.time) - new Date(b.time));
        setData(formattedData.slice(-5));
        console.log("Current Data:", formattedData.slice(-5));
      });
    };

    fetchData();
    const interval = setInterval(fetchData, 3 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="AirQualityDashboard">
      <Navbar />
      <div className="chart-container">
        <h2>Air Quality Data Over Time</h2>
        <ResponsiveContainer width="98%" height={580}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" stroke='#E7DECC'/>
            <YAxis ticks={[0, 100, 200, 300, 400, 500]} domain={[0, 500]} stroke='#E7DECC'/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="co2" stroke="skyblue" strokeWidth={3} name="CO₂ (ppm)" />
            <Line type="monotone" dataKey="co" stroke="red" strokeWidth={3} name="CO (ppm)" />
            <Line type="monotone" dataKey="pm25" stroke="yellow" strokeWidth={3} name="PM2.5 (µg/m³)" />
            <Line type="monotone" dataKey="so2" stroke="green" strokeWidth={3} name="SO2 (pbm)" />
          </LineChart>
        </ResponsiveContainer>
        <Link to="/suggestion">
          <button>View Current AQI</button>
        </Link>
      </div>
      <Footer />
    </section>
  );
};

export default DataInsight;

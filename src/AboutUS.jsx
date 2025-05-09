import React from 'react';
import Navbar from './Navbar';
import BackgroundImage from './assets/Aboutus.jpg';
import './AboutUS.css';
import './index.css';

const AboutUS = () => {
  return (
    <div className="aboutus-page">
      <div style={{ position: 'fixed', top: "2px", left: "0px", width: "100%", zIndex: 10 }}>
        <Navbar />
      </div>

      <div className="aboutus-container">
        <section className="aboutus-text-section">
          <h1 className="aboutus-title">About Us</h1>
          <p className="about-us-description">
            At FreshBreeze, our mission is to harness technology <br />
            to combat air pollution by providing real-time, accurate air quality <br />
            insights. We believe that informed individuals and communities can <br />
            take proactive steps toward a healthier and safer environment. Our <br />
            innovative solutions empower users with essential data, enabling them <br />
            to make responsible decisions and drive positive change for a cleaner future.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUS;

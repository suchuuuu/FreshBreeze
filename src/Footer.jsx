import React from 'react';
import { FaInstagram, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import logo from './assets/logo.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-links">
        <a href="https://www.instagram.com/suchita_acharyaa?igsh=MWh3MGl0azQ3NG50eQ==" target="_blank" rel="insta">
          <FaInstagram className="social-icon" />
        </a>
      </div>

      <div className="contact-info">
        <a href="mailto:freshbreeze@gmail.com" className="contact-item">
          <FaEnvelope className="contact-icon" />
          freshbreeze@gmail.com
        </a>
        <a href="tel:+9779815548012" className="contact-item">
          <FaPhoneAlt className="contact-icon" />
          +977 9815548012
        </a>
      </div>

      <img src={logo} alt="Logo" className="footer-logo" />
    </footer>
  );
};

export default Footer;

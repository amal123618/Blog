import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Blog App</h3>
          <p>Conversation is king. Content is just something to talk about</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/blogs">Blogs</a></li>
            <li><a href="/create_blog">Create blog</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
            <a href="#"><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
            <a href="#"><FontAwesomeIcon icon={faTwitter} size="2x" /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Blog App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

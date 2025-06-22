import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="home-header">
        <div className="header-content">
          <div className="text-content">
            <h1>Welcome to My Amal Blog App</h1>
            <p>Conversation is king. Content is just something to talk about</p>
            <Link to="/Blogs" className="btn-link">Blogs</Link>

          </div>
          <div className="image-side">
            <img src="/src/assets/12.jpg" alt="Biriyani" className="header-img" />
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="about-section">
        <h2 className="about-title">About This App</h2>
        <div className="about-content">
          <img src="src/assets/lap.jpg" alt="Blog about" className="about-image" />
          <p className="about-text">
            This blog application allows users to read, write, and explore insightful articles from diverse authors.
            It is built with Django and React, offering seamless interaction and dynamic content.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>What You Can Do</h2>
        <ul>
          <li>📝 Read blogs from various authors</li>
          <li>📚 Search and filter blog posts</li>
          <li>🧠 Explore trending or newest articles</li>
          <li>🙌 Leave comments and interact</li>
        </ul>
      </section>
    </div>
  );
}

export default Home;

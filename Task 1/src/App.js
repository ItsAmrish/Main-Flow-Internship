import React from 'react';
import './App.css';
import { FaSearch, FaPlay } from 'react-icons/fa';
import foodImage from './food.png';

const Header = () => (
  <header className="header">
    <div className="logo">
      <h1>Bao Bao</h1>
    </div>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#menu">Menu</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#shop">Shop</a></li>
      </ul>
    </nav>
    <div className="search-cart">
      <FaSearch className="icon" />

    </div>
  </header>
);

const Hero = () => (
  <section className="hero">
    <div className="hero-content">
      <h2>Fast <span>Food</span> Delivery</h2>
      <p>Sed ut perspiciatis unde omnis iste natus sit voluptatem accusantium doloremque laudantium</p>
      <div className="hero-buttons">
        <button className="order-btn">Order Now</button>
        <button className="video-btn">
          <FaPlay className="play-icon" />
          Watch Video
        </button>
      </div>
      <div className="rating">
        <span>⭐ ⭐ ⭐ ⭐ ⭐</span>
        <p>5 star rating based on 1788 reviews</p>
      </div>
    </div>
    <div className="hero-image">
      <img src={foodImage} alt="Fast Food" />
    </div>
  </section>
);

const App = () => {
  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
}

export default App;

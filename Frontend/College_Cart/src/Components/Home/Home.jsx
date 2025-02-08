import React from 'react'
import Header from '../Header/Header'
import './home.css'
import { FaShoppingCart, FaTags, FaExchangeAlt,FaLinkedin ,FaGithub , FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Footer from '../Footer/Footer';
const Home = () => {
  return (
  <>
  <Header/>
    <div className="container">
      <section className="hero">
        <div className="hero-overlay">
          <h1>Buy, Sell & Exchange Items in Your University</h1>
          <p>Find amazing deals, trade items, and connect with students effortlessly!</p>
          <a href="#" className="cta">Get Started</a>
        </div>
      </section>

      <section className="features">
        <div className="feature-box">
          <FaShoppingCart className="icon" />
          <h3>Buy</h3>
          <p>Discover affordable, second-hand items from your peers.</p>
        </div>
        <div className="feature-box">
          <FaTags className="icon" />
          <h3>Sell</h3>
          <p>Sell unused stuff and earn extra cash quickly.</p>
        </div>
        <div className="feature-box">
          <FaExchangeAlt className="icon" />
          <h3>Exchange</h3>
          <p>Trade items with fellow students easily.</p>
        </div>
      </section>

    </div>
    <Footer/>
   </> 
  )
}

export default Home
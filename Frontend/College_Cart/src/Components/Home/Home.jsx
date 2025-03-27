import React, { useContext } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './home.css'
import Electronic from './Category/Electronices/Electronic';
import Book from './Category/Books/Book';
import Clothing from './Category/Clothings/Clothing';
import Sport from './Category/SportsEquipment/Sport';
// import Stationary from './Category/Stationary/Stationary';
import Grocery from './Category/Grocery/Grocery';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../Header/context';

const Home = () => {
  const navigate = useNavigate()
  const {data} = useContext(UserDataContext)
  return (
    <>
      <Header/>
      <div className="home-container">
        <section className="hero">
          <div className="hero-content">
            <h1>Buy, Sell & Exchange Items in Your University</h1>
            <p>Find amazing deals, trade items, and connect with students effortlessly!</p>
            <a href="#cards-head" className="cta-button">Get Started</a>
          </div>
        </section>

        <div className="cards-section" id="cards-head">
          <div className="card">
            <h2>Buy Products</h2>
            <div className="card-image buy-image"></div>
            <p>Discover great deals on campus</p>
            {/* <a href="/all-products"  >Shop Now</a> */}
            <button onClick={()=>navigate("/all-products")} className="button">Shop Now</button>
          </div>

          <div className="card">
            <h2>Sell Items</h2>
            <div className="card-image sell-image"></div>
            <p>Turn your items into cash</p>
            {/* <a href="/sell" >Start Selling</a> */}
            <button onClick={()=>navigate(`/${data._id}/add-products-user`)} className="button">Start Selling</button>
          </div>

          <div className="card">
            <h2>Exchange Books</h2>
            <div className="card-image exchange-image"></div>
            <p>Trade textbooks with students</p>
            {/* <a  className="button">Exchange Now</a> */}
            <button onClick={()=>navigate(`/${data._id}/exchange-add-product-form`)}  className="button">Exchange Now</button>
          </div>

          <div className="card">
            <h2>Student Deals</h2>
            <div className="card-image deals-image"></div>
            <p>Special offers for students</p>
            <a  className="button">See Deals</a>
          </div>
        </div>
        <div>
          <Electronic/>
          <Book/>
          <Clothing/>
          <Sport/>
          {/* <Stationary/> */}
          <Grocery/>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Home;
import React, { useContext, useEffect } from 'react';
import { UserDataContext } from '../Header/context';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './exchange.module.css'

const ExchangeBookAllProduct = () => {
  const { exchangeProduct } = useContext(UserDataContext);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className={styles.stickyHeader}><Header /></div>
      <div className="container mx-auto px-4 py-8">    
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {exchangeProduct.map((item) => (
            <div 
              key={item._id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative items-center flex justify-center">
                <img 
                  className="w-[300px] h-[400px] object-cover mt-4 rounded-lg" 
                  src={item.image} 
                  alt={item.name}
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                <div className="mb-4">
                  {item.selectHostel === "Hostler" ? (
                    <div className="text-sm text-gray-600">
                      <p>Room: {item.roomNumber}</p>
                      <p>Hostel: {item.hostleName}</p>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600">
                      <p>Contact: {item.dayScholarContectNumber}</p>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-700 mb-4 line-clamp-3">{item.description}</p>
                
                <div className="flex justify-between items-center">
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-400">
                    Exchange
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExchangeBookAllProduct;
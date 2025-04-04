import React, { useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../Header/context';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import { ArrowLeftRight, Frown, HomeIcon, Hotel, Phone } from 'lucide-react';

const ProductSkeleton = () => {
  return (
    <div className="w-full">
      <Box
        sx={{
          width: '100%',
          padding: '15px',
          border: '1px solid #e0e0e0',
          borderRadius: '12px',
          background: '#fff',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height={300}
          sx={{ 
            marginBottom: '12px',
            borderRadius: '8px'
          }}
        />
        <Skeleton
          variant="text"
          width="80%"
          height={24}
          sx={{ marginBottom: '8px' }}
        />
        <Box sx={{ marginBottom: '12px' }}>
          <Skeleton variant="text" width="100%" height={18} />
          <Skeleton variant="text" width="90%" height={18} />
        </Box>
        <Box sx={{ marginBottom: '12px' }}>
          <Skeleton variant="text" width="100%" height={18} />
          <Skeleton variant="text" width="90%" height={18} />
        </Box>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={40}
          sx={{ borderRadius: '20px' }}
        />
      </Box>
    </div>
  );
};

const ExchangeBookAllProduct = () => {
  const { exchangeProduct, searchQuery, data } = useContext(UserDataContext);
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (exchangeProduct.length > 0) {
      const bookFilter = exchangeProduct.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const withOutUserDataShow = bookFilter.filter(
        (item) => item.userId._id !== data._id
      );
      console.log(withOutUserDataShow);
      setFilterData(withOutUserDataShow);
      setLoading(false);
    }
  }, [searchQuery, exchangeProduct, data._id]);

  return (
    <>
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
              Book Exchange
            </h1>
            <p className="text-center text-gray-600 mt-2">
              Find books to exchange with other students
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {Array.from(new Array(8)).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : filterData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filterData.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-101 hover:shadow-xl border border-gray-200"
                >
                  <div className="relative flex justify-center items-center p-3 bg-gray-50">
                    <img
                      className="w-full h-64 sm:h-56 md:h-64 lg:h-72 object-cover rounded-lg"
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                    />
                    <span  style={{backgroundColor: '#FFD814'}} className="absolute top-2 right-2 bg-yellow-#FFD814 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      Available
                    </span>
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-1">
                      {item.name}
                    </h2>
                    
                    <div className="mb-3 bg-gray-50 p-2 rounded-lg">
                      {item.selectHostel === "Hostler" ? (
                        <div className="text-sm text-gray-600">
                          <p className="flex items-center gap-1">
                          <HomeIcon size={16}/>
                            Room: {item.roomNumber}
                          </p>
                          <p className="flex items-center gap-1">
                            <Hotel size={14}/>
                            Hostel: {item.hostleName}
                          </p>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-600">
                          <p className="flex items-center gap-1">
                            <Phone size={16}/>
                            Contact: {item.dayScholarContectNumber}
                          </p>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-700 mb-4 text-sm line-clamp-2">
                      {item.description}
                    </p>

                    <button  style={{backgroundColor: '#FFD814'}} className="w-full  text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition-colors duration-300 flex items-center justify-center gap-2 font-medium">
                      <ArrowLeftRight size={20}/>
                      Exchange Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <Frown size={60} color='gray'/>
              <p className="text-2xl text-gray-700 font-bold">No Books Found</p>
              <p className="text-gray-500 mt-2">Try changing your search query</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ExchangeBookAllProduct;
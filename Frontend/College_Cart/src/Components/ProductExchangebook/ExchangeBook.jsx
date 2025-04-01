import React, { useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../Header/context';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import { data } from 'react-router-dom';


const ProductSkeleton = () => {
  return (
   <div className='skeletonContainer'>
     <Box
      sx={{
        width: 330,
        padding: '15px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        background: '#fff',
        marginRight:'30px',
        marginLeft:"0"
      }}
    >
      <Skeleton
        variant="rectangular"
        width="100%"
        height={400}
        sx={{ marginBottom: '12px' }}
      />
      <Skeleton
        variant="text"
        width="80%"
        height={20}
        sx={{ marginBottom: '8px' }}
      />
      <Box sx={{ marginBottom: '12px' }}>
        <Skeleton variant="text" width="100%" height={15} />
        <Skeleton variant="text" width="90%" height={15} />
      </Box>
      <Box sx={{ marginBottom: '12px' }}>
        <Skeleton variant="text" width="100%" height={15} />
        <Skeleton variant="text" width="90%" height={15} />
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
  const [loading, setLoading] = useState(true)


  useEffect(()=>{
 if(exchangeProduct.length > 0){
  const bookFilter =  exchangeProduct.filter((item)=>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) 
  )
  const withOutUserDataShow = bookFilter.filter((item)=>
    item.userId._id !== data._id
  )
  setFilterData(withOutUserDataShow)
  setLoading(false)
 }
  },[searchQuery,exchangeProduct])

  return (<>
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">    
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          { loading ? (
            Array.from(new Array(8)).map((_, index) => <ProductSkeleton key={index} />)
          ): filterData.length > 0 ?(
          filterData.map((item) => (
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
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-[20px] hover:bg-yellow-400">
                    Exchange
                  </button>
                </div>
              </div>
            </div>
          ))):(
            <p className='text-2xl text-black font-bold'>Product Not Found</p>
          )}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ExchangeBookAllProduct;
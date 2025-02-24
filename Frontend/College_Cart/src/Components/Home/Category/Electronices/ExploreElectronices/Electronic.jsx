import React, { useEffect, useState } from 'react';
import Header from '../../../../Header/Header';
import Footer from '../../../../Footer/Footer';
import axios from 'axios';
import { getToken } from '../../../../../util/tokenService';
import { useNavigate } from 'react-router-dom';

const Electronic = () => {
  const [electronicItem, setElectronicItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const backend_url = import.meta.env.VITE_BACKEND_API_URL;
  const navigate = useNavigate()

  useEffect(() => {
    const fetchElectronicItem = async () => {
      try {
        const token = getToken();
        const apiUrl = token ? `${backend_url}/all-product` : `${backend_url}/public-products`;
        const response = await axios.get(apiUrl, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        });
        const electronicItemFilter = response.data.products.filter(
          (productcategory) => productcategory.category === 'Electronics'
        );
        setElectronicItem(electronicItemFilter);
        setLoading(false);
        // console.log(electronicItemFilter)
      } catch (error) {
        console.log("Error", error);
        setLoading(false);
      }
    };
    fetchElectronicItem();
  }, []);

  const ProductSkeleton = () => (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
      <div className="bg-white rounded-lg shadow-md h-full">
        <div className="p-4">
          <div className="w-full h-80 bg-gray-200 animate-pulse rounded-lg mb-4" />
          <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2 mb-4" />
          <div className="h-6 bg-gray-200 animate-pulse rounded w-1/3 mb-2" />
          <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3" />
        </div>
      </div>
    </div>
  );

  const ProductCard = ({ item }) => (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 cursor-pointer" onClick={()=>navigate(`/${item._id}/product`)}>
      <div className="bg-white rounded-lg shadow-md h-full hover:shadow-lg transition-shadow duration-300">
        <div className="p-4">
          <div className="relative pb-[100%] mb-4">
            <img
              src={item.image}
              alt={item.name}
              className="absolute inset-0 w-full h-full object-contain rounded-lg"
            />
          </div>
          <h2 className="text-xl font-semibold mb-2 line-clamp-2">{item.name}</h2>
          <div className="text-sm text-gray-600 mb-2">{item.brand}</div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-bold text-red-600">
            &#8377;{item.newAmount.toLocaleString()}
            </span>
            {item.prevAmount && (
              <span className="text-sm text-gray-500 line-through">
                &#8377;{item.prevAmount.toLocaleString()}
              </span>
            )}
          </div>
          {item.prevAmount && (
            <div className="text-sm text-green-600 mb-2">
              Save &#8377;{(item.prevAmount - item.newAmount).toLocaleString()}
            </div>
          )}
          <div className="text-sm">
            {item.stock === 1 ? (
              <span className="text-green-600">In Stock</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Electronics</h1>
        <div className="flex flex-wrap -mx-4">
          {loading ? (
            <>
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </>
          ) : (
            electronicItem.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Electronic;
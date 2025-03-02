import React, { useContext, useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import './electronic.css';
import Button from '../../Button/Button';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../../../Header/context';

const ProductSkeleton = () => {
  return (
    <Box className="product-skeleton-electronics">
      <div className="skeleton-image-electronics">
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ borderRadius: '4px' }}
        />
      </div>
      <div className="skeleton-text-electronics">
        <Skeleton
          variant="text"
          width="100%"
          height={20}
        />
      </div>
    </Box>
  );
};

const Electronic = () => {
  const [productsElectronic, setProductsElectronic] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {products} = useContext(UserDataContext)
    useEffect(() => {
      if (products.length > 0) {
        const filterCategory = products.filter((item) => item.category === 'Electronics').slice(0,6);
        setProductsElectronic(filterCategory);
        setLoading(false);
      }
    }, [products]);
  return (
    <div className="electronics-container" onClick={()=>navigate("/all-electronic-item")}>
      <div className="electronics-header">
        <h2 className="electronics-title">
          Electronics
          <span onClick={()=>navigate("/all-electronic-item")} ><Button/></span>
        </h2>
      </div>
      <div className="products-grid-electronics">
        {loading ? (
          Array.from(new Array(5)).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : (
          productsElectronic.map(product => (
            <div key={product._id} className="product-card-electronics">
              <div className="product-image-container-electronics">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image-electronics"
                />
              </div>
              <div className="product-info-electronics">
                <h3 className="product-name-electronics">{product.name}</h3>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Electronic;
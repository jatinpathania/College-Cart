import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserDataContext } from '../Header/context';
import styles from './productCard.module.css';
import { Ellipsis } from 'lucide-react';
import { motion } from 'framer-motion';
import DeleteProduct from './DeleteProduct';
import Skeleton from '@mui/material/Skeleton';
import { getToken } from '../../util/tokenService';
import UpdateProduct from './UpdateProduct';

const backend_url = import.meta.env.VITE_BACKEND_API_URL;

const Product = () => {
  const [products, setProducts] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const { data, setUserProduct } = useContext(UserDataContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDeleteId, setProductToDeleteId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      setIsLoading(true);
      const token = getToken()
      // console.log(token)
      try {
        const res = await axios.get(`${backend_url}/${data._id}/get-all-profile-product`,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        // const userProducts = res.data.products.filter(
        //   (product) => product.userId._id === data._id
        // );
        setProducts(res.data.products);
        setUserProduct(res.data.products.length)
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (data._id) fetchProductData();
  }, [data._id]);

  const toggleMenu = (productId) => {
    setOpenMenuId(openMenuId === productId ? null : productId);
  };

  const truncateDescription = (text) => {
    const words = text.split(' ');
    return words.length > 30 ? words.slice(0, 30).join(' ') + '...' : text;
  };

  return (
    <>
      <div className={styles.productContainer}>
        {isLoading
          ? Array(products.length || 10).fill().map((_, index) => (
              <div key={index} className={styles.skeletonWrapper}>
                <Skeleton 
                  variant="rectangular" 
                  width={500} 
                  height={230} 
                  className={styles.skeletonImageContainer}
                />
                <div className={styles.hrline} />
                <div className={styles.skeletonDetailsContainer}>
                  <Skeleton variant="text" width="80%" height={20} />
                  <Skeleton variant="text" width="60%" height={20} />
                  <Skeleton variant="text" width="70%" height={20} />
                  <Skeleton variant="text" width="50%" height={20} />
                  <Skeleton variant="text" width="90%" height={20} />
                  <Skeleton variant="text" width="80%" height={20} />
                  <Skeleton variant="text" width="50%" height={20} />
                  <Skeleton variant="text" width="90%" height={20} />
                  <Skeleton variant="text" width="80%" height={20} />
                </div>
                <div className={styles.skeletonActionsContainer}>
                  <Skeleton variant="rectangular" width={70} height={30} />
                  {/* <Skeleton variant="rectangular" width={70} height={30} />
                  <Skeleton variant="rectangular" width={70} height={30} /> */}
                </div>
              </div>
            ))
          : products.map((product) => (
              <div key={product._id} className={styles.productWrapper}>
                <div className={styles.productImageContainer}>
                  <div style={{width:"300px",display:"flex",alignItems:'center',justifyItems:"center"}}>
                  <motion.img
                    whileHover={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 90 }}
                    src={product.image}
                    alt={product.name}
                    className={styles.productImageProfile}
                  />
                    </div>
                  <span className={styles.saleBadge} onClick={() => toggleMenu(product._id)}>
                    <Ellipsis />
                  </span>
                  {openMenuId === product._id && (
                    <div className={styles.popupMenu}>
                      <button className={styles.menuItem}>Edit</button>
                      <button className={styles.menuItem}
                      onClick={()=>{
                        setProductToUpdate(product);
                        setIsUpdateModalOpen(true); 
                       }
                      }
                      >Update</button>
                      <button
                        className={styles.menuItemDeleteBtn}
                        onClick={() => {
                          setProductToDeleteId(product._id);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <div className={styles.hrline} />
                <div className={styles.allProductContainer}>
                  <p className={styles.productName}>
                    <span className={styles.item}>Name: </span> {product.name}
                  </p>
                  <p className={styles.productBrand}>
                    <span className={styles.item}>Brand: </span> {product.brand}
                  </p>
                  <p className={styles.productBrand}>
                    <span className={styles.item}>Quantity: </span> {product.quantity}
                  </p>
                  <p className={styles.productCategory}>
                    <span className={styles.item}>Category: </span> {product.category}
                  </p>
                  <p className={styles.productSelectHostel}>
                    <span className={styles.item}>Choice student: </span> {product.selectHostel}
                  </p>
                  {product.selectHostel === 'Hostler' ? (
                    <>
                      <p className={styles.productHostleName}>
                        <span className={styles.item}>Hostel Name: </span> {product.hostleName}
                      </p>
                      <p className={styles.productRoomNumber}>
                        <span className={styles.item}>Room Number: </span> {product.roomNumber}
                      </p>
                    </>
                  ) : (
                    <p className={styles.productHostleName}>
                      <span className={styles.item}>Contact number: </span> {product.dayScholarContectNumber}
                    </p>
                  )}
                  <p className={styles.productPrevAmount}>
                    <span className={styles.item}>Buy Amount: </span> {product.prevAmount}
                  </p>
                  <p className={styles.productNewAmount}>
                    <span className={styles.item}>Selling Amount: </span> {product.newAmount}
                  </p>
                  <p className={styles.productDescription}>
                    <span className={styles.item}>Description: </span> {truncateDescription(product.description)}
                  </p>
                </div>
              </div>
            ))}
      </div>
      <DeleteProduct
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        productId={productToDeleteId}
      />
      <UpdateProduct 
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        productData={productToUpdate}
        />
    </>
  );
};

export default Product;
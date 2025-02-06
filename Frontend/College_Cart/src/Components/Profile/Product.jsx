import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserDataContext } from '../Header/context';
import styles from './productCard.module.css';
import { Ellipsis } from 'lucide-react';
import { motion } from 'framer-motion';
import DeleteProduct from './DeleteProduct';
const backend_url = import.meta.env.VITE_BACKEND_API_URL;

const Product = () => {
  const [products, setProducts] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const { data } = useContext(UserDataContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDeleteId, setProductToDeleteId] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await axios.get(`${backend_url}/all-product`);
        const userProducts = res.data.products.filter(
          (product) => product.userId._id === data._id
        );
        setProducts(userProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProductData();
  }, [data._id]);

  const toggleMenu = (productId)=>{
    setOpenMenuId(openMenuId === productId ? null : productId)
  }

  const decDescription = (text) => {
    const words = text.split(' ');
    if (words.length > 30) {
      return words.slice(0, 30).join(' ') + '...';
    }
    return text;
  };

  return (
    <>
    <div className={styles.productContainer}>
      {products.map((product) => (
        <div key={product._id} className={styles.productWrapper}>
          <div className={styles.productImageContainer}>
            <motion.img whileHover={{scale:0.9}}
            transition={{type:"spring", stiffness:300, damping:90}}
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
            <span className={styles.saleBadge} onClick={() => toggleMenu(product._id)}><Ellipsis />
            </span>
            {openMenuId === product._id && (
              <div className={styles.popupMenu}>
                <button className={styles.menuItem}>Edit</button>
                <button className={styles.menuItem}>Update</button>
                <button className={styles.menuItemDeleteBtn}  onClick={() => {
                setProductToDeleteId(product._id);
                setIsDeleteModalOpen(true);
            }}>Delete</button>
              </div>
            )}
          </div>
          <div className={styles.hrline}/>
         <div className={styles.allProductContainer}>
         <div className={styles.nameContainer}>
            <p className={styles.productName}><span>Name: </span> {product.name}</p>
          </div>
          <div>
            <p className={styles.productBrand}><span>Brand: </span>{product.brand}</p>
          </div>
          <div>
            <p className={styles.productCategory}><span>Category: </span>{product.category}</p>
          </div>
          <div>
            <p className={styles.productSelectHostel}><span>Hostel: </span>{product.selectHostel}</p>
          </div>
          <div>
            <p className={styles.productHostleName}><span>Hostle Name: </span>{product.hostleName}</p>
          </div>
          <div>
            <p className={styles.productRoomNumber}><span>Room Number: </span>{product.roomNumber}</p>
          </div>
          <div>
            <p className={styles.productPrevAmount}><span>Buy Amount: </span>{product.prevAmount}</p>
          </div>
          <div>
            <p className={styles.productNewAmount}><span>Selling Amount: </span>{product.newAmount}</p>
          </div>
          <div>
            <p className={styles.productDescription}><span>Description: </span>{decDescription(product.description)}</p>
          </div>
         </div>
        </div>
      ))}
    </div>
    <DeleteProduct isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        productId={productToDeleteId}/>
    </>
  );
};

export default Product;
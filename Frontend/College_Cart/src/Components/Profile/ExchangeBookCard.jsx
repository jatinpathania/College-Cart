import React, { useState } from 'react';
import { Ellipsis } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './productCard.module.css';
import DeleteProduct from './DeleteProduct';
import UpdateProduct from './UpdateProduct';
import ExchangeBookUpdate from './ExchangeUpdateBook';

const ExchangeBookCard = ({ exchangeBooks }) => {
    const [openMenuId, setOpenMenuId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDeleteId, setProductToDeleteId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [productToUpdate, setProductToUpdate] = useState(null);

    const toggleMenu = (bookId) => {
        setOpenMenuId(openMenuId === bookId ? null : bookId);
        // console.log(bookId)
    };

    const textDescription = (text) => {
        const words = text.split(' ');
        return words.length > 30 ? words.slice(0, 30).join(' ') + '...' : text;
    };

    return (
        <>
        <div className={styles.productContainerBookExchange}>
            {exchangeBooks.map((book) => (
                <div key={book._id} className={styles.productWrapper}>
                    <div className={styles.productImageContainer}>
                        <div style={{ width: "300px", display: "flex", alignItems: 'center', justifyItems: "center" }}>
                            <motion.img
                                whileHover={{ scale: 0.9 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 90 }}
                                src={book.image}
                                alt={book.name}
                                className={styles.productImageProfile}
                            />
                        </div>
                        <span className={styles.saleBadge} onClick={() => toggleMenu(book._id)}>
                            <Ellipsis />
                        </span>
                        {openMenuId === book._id && (
                            <div className={styles.popupMenu}>
                                <button className={styles.menuItem}>Edit</button>
                                <button className={styles.menuItem}
                                onClick={()=>{ 
                                    setProductToUpdate(book);
                                    setIsUpdateModalOpen(true); }}>Update</button>
                                <button className={styles.menuItemDeleteBtn}
                                onClick={() => {
                                    setProductToDeleteId(book._id);
                                    setIsDeleteModalOpen(true);
                                  }}>Delete</button>
                            </div>
                        )}
                    </div>
                    <div className={styles.hrline} />
                    <div className={styles.allProductContainer}>
                        <p className={styles.productName}>
                            <span className={styles.item}>Name: </span> {book.name}
                        </p>
                        {book.userId && (
                            <p className={styles.productOwner}>
                                <span className={styles.item}>Owner: </span> {book.userId.name}
                            </p>
                        )}
                        <p className={styles.productCategory}>
                            <span className={styles.item}>Student Type: </span> {book.selectHostel}
                        </p>
                        {book.selectHostel === 'Hostler' ? (
                            <>
                                <p className={styles.productHostleName}>
                                    <span className={styles.item}>Hostel Name: </span> {book.hostleName}
                                </p>
                                <p className={styles.productRoomNumber}>
                                    <span className={styles.item}>Room Number: </span> {book.roomNumber}
                                </p>
                            </>
                        ) : (
                            <p className={styles.productHostleName}>
                                <span className={styles.item}>Contact: </span> {book.dayScholarContectNumber}
                            </p>
                        )}
                        <p className={styles.productDescription}>
                            <span className={styles.item}>Description: </span> {textDescription(book.description)}
                        </p>
                        <p className={styles.productAddedOn}>
                            <span className={styles.item}>Added: </span> {new Date(book.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            ))}
        </div>
        <DeleteProduct
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        productId=""
        bookId={productToDeleteId}
      />
      <ExchangeBookUpdate 
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        productData={productToUpdate}
        />
        </>
    );
};

export default ExchangeBookCard;
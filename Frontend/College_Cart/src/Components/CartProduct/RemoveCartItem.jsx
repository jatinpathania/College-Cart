import axios from 'axios'
import React, { useRef,useEffect } from 'react'
const backend_url = import.meta.env.VITE_BACKEND_API_URL;
import toast, { Toaster } from 'react-hot-toast';
import styles from "./remove.module.css"
import { AnimatePresence, motion } from 'framer-motion';

const RemoveCartItem = ({ isOpen, onClose, cartItemId }) => {
//    console.log(cartItemId)
   const dialogRef = useRef(null);
     useEffect(() => {
       const dialogElement = dialogRef.current;
       if (isOpen) {
         dialogElement.showModal();
       } else {
         dialogElement.close();
       }
     }, [isOpen]);
   
     const handleClose = (e) => {
       e.preventDefault();
       onClose();
     };
     
    const handleDeleteProduct = async () => {
        try {
            await axios.delete(`${backend_url}/${cartItemId}/cart-product-delete`)
            toast.success("Cart product delete Successfull")
            onClose()
        } catch (error) {
            console.log("Error", error);
            toast.error("cart product delete during error");
        }
    }
    return (
        <>
           <dialog ref={dialogRef} 
                 className={styles.dialogContainer}
                 onCancel={handleClose}
               >
           <AnimatePresence>
                {isOpen && (
                    <motion.div className={styles.openDialog}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}>
                        <h2 className={styles.deleteText}>Remove Product</h2>
                        <p className={styles.deleteConfirmation}>
                            Are you sure you want to remove this product?
                        </p>
                        <div className={styles.buttonContainer}>
                            <button
                                className={styles.cancelButton}
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                            <button
                                className={styles.deleteButton}
                                onClick={handleDeleteProduct}
                            >
                                Remove
                            </button>
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>
            {/* </Animation> */}
            </dialog>
            <Toaster />
        </>
    )
}

export default RemoveCartItem
import React from "react";
import styles from "./ProductPriceDetails.module.css";

const ProductPriceDetails = ({ cartItem, setCartItems }) => {
  const calculateTotals = () => {
    return cartItem.reduce(
      (acc, item) => ({
        totalItems: acc.totalItems + (item.quantity || 1),
        totalPrice: acc.totalPrice + item.totalPrice,
        totalPrevPrice: acc.totalPrevPrice + item.prevPrice * (item.quantity || 1),
      }),
      { totalItems: 0, totalPrice: 0, totalPrevPrice: 0 }
    );
  };

  const { totalItems, totalPrice, totalPrevPrice } = calculateTotals();
  const totalDiscount = totalPrevPrice - totalPrice;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Price Details</h2>
      <hr className={styles.divider} />
      <div className={styles.details}>
        <div className={`${styles.flex} ${styles.textSmall}`}>
          <span>Price ({totalItems} items)</span>
          <span>&#8377;{totalPrevPrice}</span>
        </div>

        <div className={`${styles.flex} ${styles.textSmall}`}>
          <span>Discount</span>
          <span className={styles.discountText}>- &#8377;{totalDiscount}</span>
        </div>

        <div className={`${styles.flex} ${styles.textSmall}`}>
          <span>Delivery Charges</span>
          <span className={styles.discountText}>FREE</span>
        </div>

        <div className={styles.borderTop}>
          <div className={`${styles.flex} ${styles.textMedium}`}>
            <span>Total Amount</span>
            <span>&#8377;{totalPrice}</span>
          </div>
        </div>

        {totalDiscount > 0 && (
          <div className={styles.saveText}>
            You will save &#8377;{totalDiscount} on this order
          </div>
        )}
      </div>

      <button className={styles.button}>
        Place Order
      </button>
    </div>
  );
};

export default ProductPriceDetails;

import React, { useState } from "react";
import styles from "./Card.module.css";

function Card({ id, name, price, description, cart, setCart, stock }) {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    setCart({ ...cart, [id]: (cart[id] || 0) + 1 });
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setCart({ ...cart, [id]: (cart[id] || 0) - 1 });
    }
  };

  return (
    <div className={styles.container}>
      {stock === "available" ? (
        <>
          <div className={styles.text}>
            <div className={styles.nameAndPrice}>
              <div className={styles.name}>
                <p>{name}</p>
              </div>
              <div className={styles.price}>
                <p>{price}</p>
              </div>
            </div>
            <div className={styles.description}>
              <p>{description}</p>
            </div>
          </div>
          <div className={styles.buttonSelection}>
            <button className={styles.subtractButton} onClick={handleDecrement}>
              -
            </button>
            <p className={styles.quantity}>{quantity}</p>
            <button className={styles.addButton} onClick={handleIncrement}>
              +
            </button>
          </div>
        </>
      ) : (
        <div className={styles.text}>
          <div className={styles.name}>
            <p>{name}</p>
          </div>
          <div className={styles.description}>
            <p>Sold Out</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;

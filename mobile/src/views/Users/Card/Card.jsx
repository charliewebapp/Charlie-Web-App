import React, { useState } from "react";
import styles from "./Card.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  removeProductFromCart,
  clearCart,
} from "../../../redux/actions";

function Card({ id, name, price, description, cart, setCart, stock }) {
  const cartGlobal = useSelector((state) => state.cart); //El carrito que voy cargando.
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  console.log("carrito global", cartGlobal);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    dispatch(addProductToCart({ id, name, price, quantity: quantity + 1 }));
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      dispatch(
        removeProductFromCart({ id, name, price, quantity: quantity - 1 })
      );
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

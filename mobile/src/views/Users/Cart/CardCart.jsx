import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CardCart.module.css";
import {
  addProductToCart,
  removeProductFromCart,
  clearCart,
} from "../../../redux/actions";

function CardCart({ name, price, totalPrice, id }) {
  const dispatch = useDispatch();
  const cartGlobal = useSelector((state) => state.cart);

  const productInCart = cartGlobal.find((product) => product.id === id);

  const quantity = productInCart ? productInCart.quantity : 0;

  const handleIncrement = () => {
    dispatch(addProductToCart({ id, name, price, quantity: quantity + 1 }));
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      dispatch(
        removeProductFromCart({ id, name, price, quantity: quantity - 1 })
      );
    } else {
      dispatch(removeProductFromCart({ id }));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <div className={styles.nameAndPrice}>
          <div className={styles.name}>
            <p>{name}</p>
          </div>
          <div className={styles.price}>
            <p></p>
          </div>
        </div>
        <div className={styles.description}>
          <p>${totalPrice}</p>
        </div>
      </div>
      <div className={styles.buttonSelection}>
        <p className={styles.quantity}> {quantity} </p>
        <button className={styles.subtractButton} onClick={handleDecrement}>
          -
        </button>
        <button className={styles.addButton} onClick={handleIncrement}>
          +
        </button>
      </div>
    </div>
  );
}

export default CardCart;

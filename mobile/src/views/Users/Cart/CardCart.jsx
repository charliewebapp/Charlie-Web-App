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
  console.log("carrito en CartCart", cartGlobal); //VIENE VACIOOOOO

  //* agregar aca y abajo botton
  const productInCart = cartGlobal.find((product) => product.id === id);
  console.log(cartGlobal);

  // Si el producto está en el carrito global, obtener su cantidad, de lo contrario, es cero
  const quantity = productInCart ? productInCart.quantity : 0;

  const handleIncrement = () => {
    dispatch(addProductToCart({ id, name, price, quantity: quantity + 1 }));
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      dispatch(
        removeProductFromCart({ id, name, price, quantity: quantity - 1 })
      );
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
            <p>{price}</p>
          </div>
        </div>
        <div className={styles.description}>
          <p> Total: {totalPrice}</p>
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
        <button> Borrar </button>
      </div>
    </div>
  );
}

export default CardCart;

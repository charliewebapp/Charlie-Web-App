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
  const dispatch = useDispatch();

  // Encontrar el producto correspondiente en el carrito global
  const productInCart = cartGlobal.find((product) => product.id === id);
  console.log(cartGlobal); //!Se fue estado localll y set cuantity abajo.

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
    <div
      className={styles.container}
      style={{
        backgroundColor: stock === "available" ? "#002D46" : "#00111D",
        border: stock === "available" ? "#63B5B6 1px solid" : "none",
      }}
    >
      {stock === "available" ? (
        <>
          <div className={styles.text}>
            <div className={styles.nameAndPrice}>
              <div className={styles.name}>
                <p>{name}</p>
              </div>
              <div className={styles.price}>
                <p>$ {price}</p>
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
        <div className={styles.containerSoldout}>
          <div className={styles.nameSO}>
            <p>{name}</p>
          </div>
          <div className={styles.descriptionSO}>
            <p>Sold Out</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;

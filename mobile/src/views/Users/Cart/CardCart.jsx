import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CardCart.module.css";

function CardCart({ name, price, totalPrice }) {
  const cartGlobal = useSelector((state) => state.cart);
  console.log("carrito en CartCart", cartGlobal); //VIENE VACIOOOOO

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
        <button> Borrar </button>
      </div>
    </div>
  );
}

export default CardCart;

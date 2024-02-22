import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CardCart.module.css";
import {
  addProductToCart,
  removeProductFromCart,
  clearCart,
} from "../../../redux/actions";
import Swal from "sweetalert2";

function CardCart({ name, price, totalPrice, id }) {
  const dispatch = useDispatch();
  const cartGlobal = useSelector((state) => state.cart);

  const productInCart = cartGlobal.find((product) => product.id === id);

  const quantity = productInCart ? productInCart.quantity : 0;

  const handleIncrement = () => {
    dispatch(addProductToCart({ id, name, price, quantity: quantity + 1 }));
  };

  const handleDecrement = () => {
    console.log("entre al decrement");
    if (quantity > 1) {
      console.log("primer if");
      dispatch(
        removeProductFromCart({ id, name, price, quantity: quantity - 1 })
      );
      console.log("final primer if");
    } else if (quantity === 1) {
      console.log("entre al if de === 1");
      // Mostrar SweetAlert si la cantidad es igual a 1
      Swal.fire({
        title: "Atención",
        text: "¿Quieres eliminar este producto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#003651",
        cancelButtonColor: "rgba(221, 51, 51, 0.9)",
        confirmButtonText: "Eliminar producto",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(removeProductFromCart({ id }));
        }
      });
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

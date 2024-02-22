import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, postOrderInDB } from "../../../redux/actions";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import styles from "./OrderConfirmation.module.css";
const URL_API = import.meta.env.VITE_URL_API;

const OrderConfirmation = () => {
  const dispatch = useDispatch();
  let storedArrayString = localStorage.getItem("myArray");
  let storedArray = JSON.parse(storedArrayString);
  // const {myUser} = useSelector((state) => state.myUser);
  // console.log("myUser: ", myUser);

  //* Limpia carrito luego del pago exitoso
  useEffect(() => {
    // Dispatch clearCart() cuando el componente se monta
    dispatch(clearCart());
  }, [dispatch]);

  const myUser = JSON.parse(localStorage.getItem("myUser"));

  // console.log("myUser: ", myUser);

  const amount = storedArray.reduce(
    (acc, curr) => acc + parseFloat(curr.price) * parseInt(curr.quantity),
    0
  );

  const urlParams = new URLSearchParams(window.location.search);
  const paymentId = urlParams.get("payment_id");
  const params = Object.fromEntries(urlParams.entries());
  const { clubName } = useParams();
  const [purchaseData, setPurchaseData] = useState(null);
  const sendToDB = () => {
    dispatch(postOrderInDB(storedArray, paymentId, clubName));
  };

  const postData = {
    amount: amount,
    paymentId: Number(paymentId),
    clubName: clubName,
    cart: storedArray,
    userId: myUser.id,
  };

  console.log("postData: ", postData);

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      // hour: "numeric",
      // minute: "numeric"
    };
    return dateTime.toLocaleString(undefined, options);
  };

  const status = (status) => {
    if (status === "approved") {
      return "Esta compra fue retirada";
    } else if (status === "rejected") {
      return "Se compra fue rechazada y reembolsada";
    } else {
      return "Compra Pendiente por retirar";
    }
  };

  const postPurchase = async () => {
    try {
      const { data } = await axios.post(`${URL_API}/setPurchase`, postData);
      setPurchaseData(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (
      postData.amount &&
      postData.paymentId &&
      postData.clubName &&
      postData.cart
    ) {
      postPurchase();
    } else {
      console.log("Faltan datos en postData");
    }
    //aca escribir la funcion del qr
  }, []);

  // const orders = [

  //     {
  //         id: "c91c7694-76ab-4c56-b57d-d4607651a36b",
  //         productname: "fernet",
  //         quantity: 2,
  //         price: 3500,
  //         idMP: "484698956"
  //     },
  //     {
  //         id: "e83f9f32-7bf4-4f8d-97e7-255779561b58",
  //         productname: "birra",
  //         quantity: 2,
  //         price: 3500,
  //         idMP: "484698956"
  //     },
  //     {
  //         id: "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
  //         productname: "guaro",
  //         quantity: 2,
  //         price: 3500,
  //         idMP: "484698956"
  //     },
  // ]

  // {
  //     totalPrice: 10500,
  //     ClientId: "0db15a91-5308-4fe3-8a28-4083507a75af",
  //     UserId: "facebook|10231414652610252",
  // }

  // useEffect(() => {
  //     dispatch(postOrderInDB(orders, idMP, client));
  // }, [dispatch, orders]);

  return (
    <div className={styles.container}>
      {purchaseData ? (
        <div>
          <h1 className={styles.h2}> TU PEDIDO </h1>
          <h4>Fecha: {formatDateTime(purchaseData.dateTime)}</h4>
          <h4>Total: ${purchaseData.amount}</h4>
          <h2>Productos:</h2>
          <ul className={styles.products}>
            {purchaseData.cart.map((item) => (
              <li key={item.id}>
                {item.name} | Cantidad: {item.quantity} | Valor: ${item.price}
              </li>
            ))}
          </ul>
          <p>Estado: {status(purchaseData.status)}</p>
          <h5> Número de transacción: {purchaseData.paymentId}</h5>
          <button className={styles.button}>Volver a home</button>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default OrderConfirmation;

// https://www.youtube.com/?collection_id=72621454230&collection_status=approved&payment_id=72621454230&status=approved&external_reference=null&payment_type=account_money&merchant_order_id=15885055240&preference_id=1685591570-adc2b4ec-e0f5-4198-b41d-9545ab2d0796&site_id=MLA&processing_mode=aggregator&merchant_account_id=null

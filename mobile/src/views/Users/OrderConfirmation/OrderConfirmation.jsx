import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postOrderInDB } from "../../../redux/actions";
import { useParams } from "react-router-dom";
import axios from "axios";

const OrderConfirmation = () => {
  let storedArrayString = localStorage.getItem("myArray");
  let storedArray = JSON.parse(storedArrayString);
  const amount = storedArray.reduce(
    (acc, curr) => acc + parseFloat(curr.price) * parseInt(curr.quantity),
    0
  );

  
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get("payment_id");
    const params = Object.fromEntries(urlParams.entries());
    const { clubName } = useParams();
    const dispatch = useDispatch();



  const postPurchase =  async( )=>{
    try {
        console.log('entrando');
        const {data} = axios.post("http://localhost:3001/setPurchase", {
            amount, paymentId , clubName 
        })
        console.log('finalizado');
        console.log(data);
    } catch (error) {
        
    }
  }



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

  const sendToDB = () => {
    dispatch(postOrderInDB(storedArray, paymentId, clubName));
  };

  return (
    <div>
      <h1>Confirmacion de tu orden</h1>
      <p>Tu orden ha sido procesada con exito</p>
      <ul>
        {storedArray.map((product) => (
          <li key={product.id}>{product.productname}</li>
        ))}
      </ul>
      {/* <p>Total: {totalPrice.toFixed(2)}</p> */}
      <button onClick={sendToDB}>Enviar</button>
      <button onClick={postPurchase}>Enviar a DB</button>

      <div>
        <h2>Datos de la URL</h2>
        <ul>
          <li>payment_id: {params.payment_id}</li>
          <li>payment_type: {params.payment_type}</li>
          <li>merchant_order_id: {params.merchant_order_id}</li>
          <li>preference_id: {params.preference_id}</li>
        </ul>
      </div>
    </div>
  );
};

export default OrderConfirmation;

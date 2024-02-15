import React, { useEffect } from "react";
import '../DetailQR/detailqr.module.css';
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { getOrderQRCode } from "../../../redux/actions";
import style from './detailqr.module.css';


function DetailQR() {

  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getOrderQRCode())
  // }, [dispatch])

  // const cart = useSelector(state => state.QrCode)



  const cart = {  //este obj llega desde un estado global carrito
    id: '6rhu73f5-3f5h-3f5h-3f5h-3f5h3f5h3f5h',
    products: [
      {
        id: 1,
        name: "Coca Cola",
        price: 2.5,
        quantity: 2
      },
      {
        id: 2,
        name: "Pepsi",
        price: 2.5,
        quantity: 2
      }
    ],
    totalPrice: 25000,
    status: "en proceso"
  };

  const cartString = JSON.stringify(cart);



  return (


    <div className={style.container} >

      <h1 className={style.h1}>Detalle de la orden</h1>
      <h2 className={style.h2}>Acercate a la barra con tu codigo</h2>

      <div style={{ background: 'white', padding: '16px' }}>
        <QRCode value={cartString} />
      </div>


    </div>

  )
}

export default DetailQR;
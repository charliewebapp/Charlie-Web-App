import React, { useEffect, useState } from 'react';
import '../DetailQR/detailqr.module.css';
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getOrderQRCode } from "../../../redux/actions";
import style from './detailqr.module.css';
import {
  EmailShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  EmailIcon,
  TelegramIcon,
  WhatsappIcon
} from "react-share";




function DetailQR() {

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch()
  const cart = useSelector(state => state.orderqrdata)
  console.log(cart, "cart")

  useEffect(() => {
    dispatch(getOrderQRCode());
  }, [dispatch]);

  useEffect(() => {
    if (cart) {
      setIsLoading(false);
    }
  }, [cart]);

  // const filteredCart = {
  //   ...cart,
  //   products: cart.products.map(({ brand, name, price, stock }) => ({
  //     brand,
  //     name,
  //     price,
  //     stock
  //   }))
  // };

  const cartString = JSON.stringify(cart);



  return (
    isLoading ? (
      <div>Loading...</div> // Replace this with your loading spinner
    ) : (
      <div className={style.container}>
        <h1 className={style.h1}>Detalle de la orden</h1>
        <h2 className={style.h2}>Acercate a la barra con tu codigo</h2>

        <div style={{ background: 'white', padding: '16px' }}>
          <QRCode value={cartString} />
        </div>

        <div className={style.shareButtons}>
          <EmailShareButton url={window.location.href} subject="QR" body="Acercate a la barra con tu codigo">
            <EmailIcon size={32} round />
          </EmailShareButton>
          <TelegramShareButton url={window.location.href} title="QR">
            <TelegramIcon size={32} round />
          </TelegramShareButton>
          <WhatsappShareButton url={window.location.href} title="QR" separator=": ">
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
      </div>
    ))
}

export default DetailQR;
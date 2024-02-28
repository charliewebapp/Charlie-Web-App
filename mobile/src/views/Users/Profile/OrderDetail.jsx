import React, { useEffect } from "react";
import DetailQR from "../DetailQR/DetailQR";
import OrderRejected from "./OrderRejected";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOrderQRCode, getDetailQrCode } from "../../../redux/actions";
import style from "./OrderDetail.module.css";

function OrderDetail() {
  const dispatch = useDispatch();

  const detail = useSelector((state) => state.detailQrCode);
  const cart = useSelector((state) => state.orderqrdata);
  const clubName = useSelector((state) => state.myBoliche.name);

  console.log(clubName, "clubName en OD");

  // console.log(cart, "cart en OD");
  console.log(detail, "detail en OD");
  // console.log(cart[0].paymentId, "paymentId en OD");

  let paymentId
  useEffect(() => {
    dispatch
    if (cart && cart.length > 0) {
      paymentId = cart[0].paymentId;
    }
    const intervalId = setInterval(() => {
      if (paymentId) {
        dispatch(getOrderQRCode(paymentId));
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [cart]);


  return (
    <div className="container">
      {(cart.length > 0 && cart[0].status === "pending" || detail.length > 0 && detail[0].status === "pending") ? (
        <>
          <DetailQR />
        </>
      ) : cart.length > 0 && cart[0].status === "rejected" ? (
        <>
          <OrderRejected />
        </>
      ) : detail.length > 0 && detail[0].status === "rejected" ? (
        <>
          <div className={style.h1}>
            <h1>Esta orden fue rechazada</h1>
          </div>
        </>
      ) : detail.length > 0 && detail[0].status === "approved" ? (
        <>
          <div className={style.approved}>
            <h1>Esta orden ya fue entregada</h1>
          </div>
        </>
      ) : null}
      <Link to={`/${clubName}/home`}>
        <button className={style.button}>Regresar al comercio</button>
      </Link>
    </div>
  );
}

export default OrderDetail;

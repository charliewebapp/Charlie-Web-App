import React, { useEffect } from "react";
import DetailQR from "../DetailQR/DetailQR";
import OrderRejected from "./OrderRejected";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOrderQRCode, getDetailQrCode } from "../../../redux/actions";
import "./OrderDetail.module.css";

function OrderDetail() {
  const dispatch = useDispatch();

  const detail = useSelector((state) => state.detailQrCode);
  const cartState = useSelector((state) => state.orderqrdata);
  const cart = [cartState];

  console.log(cart, "cart en OD");
  console.log(detail, "detail en OD");

  useEffect(() => {
    let paymentId;
    if (cart && cart.length > 0) {
      paymentId = cart[0].paymentId;
    }
    const intervalId = setInterval(() => {
      if (paymentId) {
        dispatch(getOrderQRCode(paymentId));
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);


  return (
    <div className="container">
      {(detail.length > 0 && detail[0].status !== "rejected") ||
        (cart.length > 0 && cart[0].status !== "rejected") ? (
        <>
          <DetailQR />
          <Link to="/:clubName/home">
            <button>Regresar al comercio</button>
          </Link>
        </>
      ) : cart.length > 0 && cart[0].status === "rejected" ? (
        <>
          <OrderRejected />
          <Link to="/:clubName/home">
            <button>Regresar al comercio</button>
          </Link>
        </>
      ) : null}
    </div>
  );
}

export default OrderDetail;

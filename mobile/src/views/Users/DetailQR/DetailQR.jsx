import React, { useEffect, useState } from "react";
import Modal from "react-modal"; // Import the Modal component
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getDetailQrCode } from "../../../redux/actions";
import style from "./detailqr.module.css";

function DetailQR() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detailQrCode);
  const cart = useSelector((state) => state.orderqrdata);


  console.log(cart, "cart en DQR");
  console.log(detail, "detail en DQR")

  // States for managing the modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalProducts, setModalProducts] = useState([]);

  // useEffect(() => {
  //     dispatch(getDetailQrCode());
  // }, [dispatch]);

  useEffect(() => {
    if (cart.length !== 0 || detail) {
      setIsLoading(false);
    }
  }, [cart, detail]);
  let mappedData, cartString, mappedData2, cartString2;

  if (cart && cart.length > 0) {
    // Check if 'cart' exists and has elements
    mappedData = {
      cart: cart.map((product) => ({
        name: product.cart[0].name,
        quantity: product.cart[0].quantity,
      })),
      status: cart[0].status,
      club: cart[0].client.name,
      id: cart[0].id,
    };

    console.log(mappedData, "mappedData")

    cartString = JSON.stringify([mappedData]);
  } else if (detail) {
    mappedData2 = {
      status: detail.status,
      cart: detail.cart.map((product) => ({
        name: product.name,
        quantity: product.quantity,
      })),
    };

    cartString2 = JSON.stringify([mappedData2]);
  }

  // Function to open the modal and set the products to display
  const openModal = (products) => {
    setModalProducts(products);
    setModalIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  console.log(modalProducts, "modalProducts");

  return (
    <div className={style.container}>
      {isLoading ? (
        <div>Loading...</div>
      ) : cart && cart.length > 0 ? (
        <>
          <h1 className={style.h1}>Detalle de la orden</h1>
          <h2 className={style.h2}>Acercate a la barra con tu codigo</h2>
          <div style={{ background: "white", padding: "16px" }}>
            <QRCode value={cartString} />
          </div>
          {/* Button to open the modal */}
          <button onClick={() => openModal(cart)}>Ver productos</button>
        </>
      )
        : detail ? (
          <>
            <div style={{ background: "white", padding: "16px" }}>
              <QRCode value={cartString2} />
            </div>
            {/* Button to open the modal */}
            <button onClick={() => openModal(detail.cart)}>Ver productos</button>

          </>
        ) : null}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={style.modalContainer}
        portalClassName={style.customReactModalPortal}
        style={{
          overlay: {
            backgroundColor: "rgba(0,  0,  0,  0.90)",
          },
          content: {
            color: "orange",
          },
        }}
      >
        <h2 className={style.h2}>Productos en la orden</h2>
        {modalProducts.map((order, i) => (
          <div key={i} className={style.orderContainer}>

            {Array.isArray(order.cart) && order.cart.length > 0 ? (
              order.cart.map((product, j) => (
                <div key={j} className={style.productInfo}>
                  <div className={style.productName}>
                    <h5 className={style.h5}>{product.name}&nbsp; </h5>

                    <h5 className={style.h5}>x {product.quantity}</h5>
                  </div>
                  <div className={style.productPrice}>
                    <h5 className={style.h5}>$ {product.price}</h5>
                  </div>
                </div>
              ))
            ) : (
              <div className={style.productInfo}>
                <div className={style.productName}>
                  <span className={style.h5}>
                    {order.name}&nbsp;
                  </span>
                  <span className={style.h5}>x {order.quantity}</span>
                </div>
                <div className={style.productPrice}>
                  <span className={style.h5}>
                    $ {order.price}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </Modal>
    </div>
  );
}

export default DetailQR;

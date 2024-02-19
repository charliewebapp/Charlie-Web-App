import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import CardCart from "./CardCart";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { clearCart } from "../../../redux/actions";
import axios from "axios";
import NavBarUser from "../NavBarUser/NavBarUser";
import styles from "./Cart.module.css";
import { GoTrash } from "react-icons/go";
import { AiOutlineShop } from "react-icons/ai";

function Cart() {
  const { clubName } = useParams();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  let arrayString = JSON.stringify(cart);
  // Guardar la cadena en localStorage

  const urlKey = "http://localhost:3001/search-apiKey";
  const [preferenceId, setPreferenceId] = useState(null);
  const [apiKey, setapiKey] = useState(null);
  localStorage.setItem("pathname", clubName);

  const keyData = async () => {
    try {
      const { data } = await axios.post(urlKey, { clubName });
      setapiKey(data);
    } catch (error) {
      console.error("Error al enviar la solicitud al servidor:", error);
    }
  };
  initMercadoPago(apiKey, {
    locale: "es-AR",
  });

  const createProference = async () => {
    try {
      let newArray = cart.map((item) => ({
        id: item.id,
        title: item.name,
        unit_price: item.price,
        quantity: item.quantity,
      }));
      console.log("post purchase");
      const response = await axios.post(
        "http://localhost:3001/create_preference",
        {
          products: newArray,
          path: clubName,
        }
      );

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error.message);
    }
  };

  const goCheckout = async () => {
    localStorage.setItem("myArray", arrayString);
    await keyData();
    const preferenceId = await createProference();
    if (preferenceId) {
      setPreferenceId(preferenceId);
    }
    console.log("preference id : ", preferenceId);
  };

  const total = cart.reduce(
    (acc, curr) => acc + parseFloat(curr.price) * parseInt(curr.quantity),
    0
  );

  const handleEmptyCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className={styles.container}>
      <NavBarUser />
      <div className={styles.tuPedido}>
        <div className={styles.pedidoTrash}>
          <h1 className={styles.h1}>
            <Link to={`/${clubName}/home`}>
              <AiOutlineShop className={styles.storeIcon} />
            </Link>
            Tu pedido
            <GoTrash className={styles.trashIcon} onClick={handleEmptyCart} />
          </h1>
        </div>

        {cart.map((product) => (
          <CardCart
            key={product.id}
            id={product.id}
            name={product.name.toUpperCase()}
            price={product.price}
            quantity={product.quantity}
            totalPrice={product.price * product.quantity}
          />
        ))}
        <button className={styles.button} onClick={goCheckout}>
          Pagar ${total}
        </button>
        {preferenceId && (
          <Wallet
            initialization={{
              preferenceId: preferenceId,
              redirectMode: "blank",
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Cart;

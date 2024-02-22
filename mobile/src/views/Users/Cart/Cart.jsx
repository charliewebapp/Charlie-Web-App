import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import CardCart from "./CardCart";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { clearCart, setCartFromLocalStorage } from "../../../redux/actions";
import axios from "axios";
import NavBarUser from "../NavBarUser/NavBarUser";
import styles from "./Cart.module.css";
import { GoTrash } from "react-icons/go";
import Swal from "sweetalert2";
const URL_API = import.meta.env.VITE_URL_API;

function Cart() {
  const { clubName } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));

  useEffect(() => {
    // Recuperar el carrito del localStorage al montar el componente
    if (cartFromLocalStorage) {
      dispatch(setCartFromLocalStorage(cartFromLocalStorage));
    }
  }, [dispatch]);

  console.log("cart de localStorage", cartFromLocalStorage);

  let arrayString = JSON.stringify(cart);
  // Guardar la cadena en localStorage

  const urlKey = `${URL_API}/search-apiKey`;
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
      const response = await axios.post(`${URL_API}/create_preference`, {
        products: newArray,
        path: clubName,
      });

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
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres vaciar el carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#fccf83",
      cancelButtonColor: "rgba(221, 51, 51, 0.9)",
      confirmButtonText: "Vaciar carrito",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCart());
      }
    });
  };

  return (
    <div className={styles.container}>
      <NavBarUser />
      <div className={styles.tuPedido}>
        <div className={styles.pedidoTrash}>
          <h1 className={styles.h1}>
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
        <div className={styles.moreItemContainer}>
          <span className={styles.moreItemText}>Agregar Item</span>
          <div className={styles.moreItemButton}>
            <Link to={`/${clubName}/home`}>
              <button className={styles.buttonItem}> + </button>
            </Link>
          </div>
        </div>
        {preferenceId ? (
          <Wallet
            initialization={{
              preferenceId: preferenceId,
              redirectMode: "self",
            }}
          />
        ) : (
          <button className={styles.button} onClick={goCheckout}>
            Confirmar pedido ${total}
          </button>
        )}
        //*Si rompe el renderizado de arriba, cambiar a este
        {/* {preferenceId ? null : (
          <button className={styles.button} onClick={goCheckout}>
            Confirmar pedido ${total}
          </button>
        )}
        {preferenceId && (
          <Wallet
            initialization={{
              preferenceId: preferenceId,
              redirectMode: "self",
            }}
          />
        )} */}
      </div>
    </div>
  );
}

export default Cart;

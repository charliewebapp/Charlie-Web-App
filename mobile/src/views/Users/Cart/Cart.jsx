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
import { paymentValidationnw } from "../../../redux/actions";
import { useNavigate } from 'react-router-dom'; // Utiliza useNavigate en lugar de useHistory



function Cart() {
  const bolicheName = useParams().clubName
  const [status,setStatus] = useState(false)
  const handleStatusUpdate = async () => {
    try {
      const { status, autorizacion } = await paymentValidationnw(bolicheName);
      if (status === "active" & autorizacion=== true ) {setStatus(true)}
    } catch (error) {
      console.error(error);
    }
  };
  
  


  useEffect(() => {
    handleStatusUpdate();
  }, []);


 
  console.log("nombre del boliche", bolicheName)
 
  console.log (URL_API)
  const history = useNavigate();
  const myUserLogged = useSelector((state) => state.myUser.id);

  console.log(myUserLogged);
  const { clubName } = useParams();
  const clubNameLC = clubName.toLowerCase();
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
  localStorage.setItem("pathname", clubNameLC);

  const keyData = async () => {
    try {
      const { data } = await axios.post(urlKey, { clubName: clubNameLC });
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
        path: clubNameLC,
      });

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error.message);
    }
  };

  const mostrarAlerta = () => {
    Swal.fire({
      icon: "warning",
      title: "Debe loguearse primero",
      showCancelButton: true,
      confirmButtonText: "Login",
      cancelButtonText: "Regresar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Acciones cuando se hace clic en "Login"
        history(`/${clubName}/login`); // Reemplaza '/pagina-de-inicio' con tu ruta real de inicio de sesión
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };

  const goCheckout = async () => {
    console.log(status)
   if (!status )  return  Swal.fire({
    icon: 'warning',
    title: 'Este boliche no tiene las configuraciones para recibir pagos.',
    
    confirmButtonText: 'Volver',
   
  })

    if (!myUserLogged) {
      // Muestra la alerta utilizando SweetAlert
      mostrarAlerta();
    } else {
      localStorage.setItem("myArray", arrayString);
      await keyData();
      const preferenceId = await createProference();

      if (preferenceId) {
        setPreferenceId(preferenceId);
      }
      console.log("preference id : ", preferenceId);
    }
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

  function capitalizeFirstLetter(string) {
    return string
      .split(" ") // Dividir el string en un array de palabras
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalizar la primera letra de cada palabra
      .join(" "); // Unir las palabras nuevamente en un string
  }

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
        <div className={styles.cardCartContainer}>
          {cart.map((product) => (
            <CardCart
              key={product.id}
              id={product.id}
              name={capitalizeFirstLetter(product.name)}
              price={product.price}
              quantity={product.quantity}
              totalPrice={product.price * product.quantity}
            />
          ))}
        </div>
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

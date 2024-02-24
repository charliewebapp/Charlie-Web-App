import axios from "axios";
import Swal from "sweetalert2";
import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  CLEAN_CART,
  GET_MY_BOLICHE,
  POST_USER,
  INITIALIZE_CART_FROM_LOCAL_STORAGE,
  SET_CART_FROM_LOCAL_STORAGE,
  GET_ORDER_QR,
  GET_DETAIL_QR,
} from "./actionsTypes";

const URL_API = import.meta.env.VITE_URL_API;

export const getProducts = (clubName) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_API}/${clubName}/product`);
      dispatch({
        type: GET_PRODUCTS,
        payload: data,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Error al cargar los productos. ${error.message}`,
        icon: "error",
        timer: "3000",
        confirmButtonColor: "rgb(187, 131, 43)",
      });
    }
  };
};

// VALIDACIONES
export const paymentValidationnw = async(clubName) => {
  const endpoint = `${URL_API}/validations/${clubName}`;

try {
  const response = await axios.get(endpoint);
  
  return response.data;
} catch (error) {
  console.error(error);
  throw error; // Re-lanzar el error para que pueda ser manejado en el lugar donde llamas a la función
}
};


//* CARRITO

export const addProductToCart = (product) => {
  return async (dispatch, getState) => {
    try {
      const { cart } = getState();
      const productIndex = cart.findIndex((item) => item.id === product.id);

      if (productIndex !== -1) {
        // El producto ya está en el carrito, actualizar la cantidad
        const updatedCart = [...cart];
        updatedCart[productIndex].quantity += 1;
        dispatch({
          type: ADD_PRODUCT,
          payload: updatedCart,
        });
      } else {
        // El producto no está en el carrito, agregarlo
        dispatch({
          type: ADD_PRODUCT,
          payload: [...cart, { ...product, quantity: 1 }],
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Error al agregar producto al carrito.`,
        icon: "error",
        timer: "3000",
        confirmButtonColor: "rgb(187, 131, 43)",
      });
    }
  };
};

export const removeProductFromCart = (product) => {
  return async (dispatch, getState) => {
    try {
      const { cart } = getState();
      const productIndex = cart.findIndex((item) => item.id === product.id);

      if (productIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart[productIndex].quantity -= 1;
        dispatch({
          type: REMOVE_PRODUCT,
          payload: updatedCart,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Error al eliminar producto del carrito.`,
        icon: "error",
        timer: "3000",
        confirmButtonColor: "rgb(187, 131, 43)",
      });
    }
  };
};

export const clearCart = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CLEAN_CART,
      });
      localStorage.removeItem("cart");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Error al vaciar el carrito.`,
        icon: "error",
        timer: "3000",
        confirmButtonColor: "rgb(187, 131, 43)",
      });
    }
  };
};

export const initializeCartFromLocalStorage = (cart) => ({
  type: INITIALIZE_CART_FROM_LOCAL_STORAGE,
  payload: cart,
});

export const setCartFromLocalStorage = (cart) => ({
  type: SET_CART_FROM_LOCAL_STORAGE,
  payload: cart,
});

//! -------------------------------------- BOLICHE ----------------------------------------
export const getMyBoliche = (clubName) => {
  const endpoint = `${URL_API}/client`;

  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      const myBoliche = data.find(
        (boliche) => boliche.name.toLowerCase() === clubName.toLowerCase()
      );
      if (myBoliche) {
        return dispatch({
          type: GET_MY_BOLICHE,
          payload: myBoliche,
        });
      } else {
        throw new Error("No existe el boliche")

      }

    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Consulte en barra por el correcto código QR para ingresar",
        icon: "error",
        confirmButtonColor: "rgb(187, 131, 43)",
      });
    }
  };
};

//! -------------------------------------- SAVE CART IN DATABASE ----------------------------------------
export const postOrderInDB = (cart, idMP, clubID) => {
  console.log("aqui inicia el order", cart, "aqui finaliza", idMP, clubID);
  return async () => {
    try {
      for (const orderItem of cart) {
        const data = await axios.post(
          `${URL_API}/${clubID}/collaborator/qr/${idMP}`,
          orderItem
        );
        console.log(data, "data para orderItem:", orderItem);
      }
    } catch (error) {
      console.error(error); // Log the error to the console
      window.alert("No se ha creado la orden. " + error.message);
    }
  };
};

//! --------------------------------- USER ACTIONS---------------------------

export const postUser = (userData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL_API}/user`, userData);
      if (data) {
        dispatch({
          type: POST_USER,
          payload: userData,
        });
      }
    } catch (error) {
      console.log(error.message);
      // Swal.fire({
      //   title: "Error",
      //   text: `No se pudo postear el usuario. ${error.message}`,
      //   icon: "error",
      //   timer: "3000",
      //   confirmButtonColor: "rgb(187, 131, 43)",
      // });
    }
  };
};


export const getOrderQRCode = (paymentId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${URL_API}/detailPurchase/${paymentId}`
      );
      console.log(data, "data en el acion")
      dispatch({ type: GET_ORDER_QR, payload: data });
    } catch (error) {
      console.error(error); // Log the error to the console
      window.alert("No se ha creado la orden. " + error.message);
    }
  };
};


// const data = [
//   {
//     "ClientId": "87d03f75-42d5-4279-8228-926f6f79c8c5",
//     "UserId": "auth0|65cfa8efa259fd3e778d8e3a",
//     "amount": 80,
//     "cart": [
//       {
//         "id": "7477daa0-7a68-4607-9109-9b9ec5e9a98c",
//         "name": "RON",
//         "price": 10,
//         "quantity": 2
//       },
//       {
//         "id": "42c38886-f827-4bf4-9ebd-fabaccf95b6e",
//         "name": "TEQUILA",
//         "price": 12,
//         "quantity": 2
//       },
//       {
//         "id": "1ef8cb11-844b-4dca-9270-dd339d790ccb",
//         "name": "QUILMES",
//         "price": 5,
//         "quantity": 2
//       },
//       {
//         "id": "243cc08d-1081-4af7-b6c7-b9316a126a85",
//         "name": "VODKA",
//         "price": 7,
//         "quantity": 2
//       },
//       {
//         "id": "1587ea1e-fa18-48c2-8813-771f9d532e64",
//         "name": "MALBEC",
//         "price": 6,
//         "quantity": 2
//       }
//     ],
//     "dateTime": "2024-02-19T18:15:28.080Z",
//     "id": "9a127436-c95b-4c3a-a00c-3a62899a4bed",
//     "paymentId": "72725009048",
//     "status": "accepted"
//   },

// ]


export const getDetailQrCode = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${URL_API}/detailPurchase/${paymentId}`
      );
      dispatch({ type: GET_DETAIL_QR, payload: data });
    } catch (error) {
      console.error(error); // Log the error to the console
      window.alert("No se ha creado la orden. " + error.message);
    }
  };
}

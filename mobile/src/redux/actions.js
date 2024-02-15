import axios from "axios";
import Swal from "sweetalert2";
import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  CLEAN_CART,
} from "./actionsTypes";

export const getProducts = (clubName) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/${clubName}/product`
      );
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

        if (updatedCart[productIndex].quantity > 1) {
          // Reducir la cantidad del producto en 1 si es mayor que 1
          updatedCart[productIndex] = {
            ...updatedCart[productIndex],
            quantity: updatedCart[productIndex].quantity - 1,
          };
        } else {
          // Si la cantidad es 1, eliminar el producto del carrito
          updatedCart.splice(productIndex, 1);
        }

        dispatch({
          type: REMOVE_PRODUCT,
          payload: updatedCart, // Pasar el carrito actualizado como payload
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

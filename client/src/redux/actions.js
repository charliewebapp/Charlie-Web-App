import axios from "axios";
import {
  GET_PRODUCTS,
  POST_PRODUCT,
  UPDATE_PRODUCT,
  POST_BOLICHE,
} from "./actions-types";

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        "http://localhost:3001/testNati/product"
      );
      dispatch({
        type: GET_PRODUCTS,
        payload: data,
      });
    } catch (error) {
      window.alert(error.message);
    }
  };
};

export const postProduct = (productData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/testnati/product",
        productData
      );
      if (data) {
        dispatch({
          type: POST_PRODUCT,
          payload: data,
        });
      } else {
        throw new Error("No se ha creado el producto");
      }
    } catch (error) {
      window.alert("No se ha creado el producto" + error.message);
    }
  };
};

export const updateProduct = (productData, idProduct) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3001/testnati/${idProduct}`,
        productData
      );
      if (data) {
        dispatch({
          type: UPDATE_PRODUCT,
          payload: data,
        });
      } else {
        throw new Error("No se ha actualizado el producto");
      }
    } catch (error) {
      window.alert("No se ha actualizado el producto. " + error.message);
    }
  };
};

//! //////////////////////// CREAR BOLICHE ////////////////////////////
export const postBoliche = (boliche) => {
  const endpoint = "http://localhost:3001/client";
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, boliche);

      return dispatch({
        type: POST_BOLICHE,
        payload: data,
      });
    } catch (error) {
      console.error(error.message);
    }
  };
};

//! //////////////////////// CREAR ADMIN ////////////////////////////

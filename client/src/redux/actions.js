import axios from "axios";
import {
  GET_PRODUCTS,
  POST_PRODUCT,
  UPDATE_PRODUCT,
  POST_BOLICHE,
  DELETE_PRODUCT,
  POST_ADMIN,
  GET_BOLICHES,
  GET_COLLABORATORS,
  POST_COLLABORATOR,
  UPDATE_COLLABORATOR
} from "./actions-types";

//! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!    COLLABORATORS    /////////////////////////
export const getCollaborators = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        "http://localhost:3001/testnati/collaborator/users"
      );
      dispatch({
        type: GET_COLLABORATORS,
        payload: data,
      });
    } catch (error) {
      window.alert(error.message);
    }
  };
};



export function updateCollaborator(collaboratorData, idCollaborator) {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3001/testnati/collaborator/${idCollaborator}`,
        collaboratorData
      );
      if (data) {
        dispatch({
          type: UPDATE_COLLABORATOR,
          payload: data,
        });
      }
    } catch (error) {
      window.alert(error.message);
    }
  };
};


export const postCollaborator = (collaboratorData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/testnati/collaborator",
        collaboratorData
      );
      if (data) {
        dispatch({
          type: POST_COLLABORATOR,
          payload: data,
        });
      }
    } catch (error) {
      window.alert(error.message);
    }
  };
};


//! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!    PRODUCTS    /////////////////////////
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

export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3001/testnati/${id}`
      );
      if (data) {
        dispatch({
          type: DELETE_PRODUCT,
          payload: id,
        });
      } else {
        throw new Error("No se ha eliminado el producto");
      }
    } catch (error) {
      window.alert("No se ha eliminado el producto. " + error.message);
    }
  };
};

//! //////////////////////// SUPER ADMIN ////////////////////////////

//? //////////////////////// CREAR BOLICHE ////////////////////////////
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

//? //////////////////////// TRAER BOLICHES ////////////////////////////
export const getBoliches = () => {
  const endpoint = "http://localhost:3001/client";

  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);

      return dispatch({
        type: GET_BOLICHES,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

//? //////////////////////// CREAR ADMIN ////////////////////////////
export const postAdmin = (admin, params) => {
  console.log(admin, "ADMINS");
  console.log(params, "PARAMS");

  const endpoint = `http://localhost:3001/${params}/administrator`;

  console.log(endpoint, "ENDPOINT");

  return async (dispatch) => {
    try {
      const data = await axios.post(endpoint, admin);

      return dispatch({
        type: POST_ADMIN,
        payload: data,
      });
    } catch (error) {
      console.error(error.message);
    }
  };
};
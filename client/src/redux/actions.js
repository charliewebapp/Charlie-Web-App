import axios from "axios";
import Swal from "sweetalert2";
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
  UPDATE_COLLABORATOR,
  GET_ADMINS,
  SELECT_CLIENT_ADMIN,
  SADMIN_STATUS_LOGIN,
  ADMIN_STATUS_LOGIN,
  GET_ADMINISTRATORS,
  DELETE_COLLABORATOR,
  SET_CLUB_ID,
  GET_SALES,
  LOG_OUT_ADMIN,
  ADMIN_CONFIG_VIEW,
  DELETE_BOLICHE,
  DELETE_BOLICHE_ADMINS,
  ADMIN_ID_LOGGED,
  COLLABORATOR_STATUS_LOGIN,
  COLLABORATOR_STATUS_LOGOUT,
  POST_ORDER,
  GET_ORDER_QR,
  COLLABORATOR_ID_LOGGED,
  SELECT_CLIENT_COLLABORATOR,
  GET_ALL_COLLABORATORS,
} from "./actions-types";

const URL_API = import.meta.env.VITE_URL_API;

//! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!    COLLABORATORS    /////////////////////////
export const getCollaborators = (clubName) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${URL_API}/${clubName}/collaborator/users`
      );
      dispatch({
        type: GET_COLLABORATORS,
        payload: data,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Error al cargar los colaboradores. ${error.message}`,
        icon: "error",
        timer: "3000",
        confirmButtonColor: "rgb(187, 131, 43)",
      });
    }
  };
};

export function updateCollaborator(collaboratorData, idCollaborator, clubName) {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `${URL_API}/${clubName}/collaborator/${idCollaborator}`,
        collaboratorData
      );
      if (data) {
        dispatch({
          type: UPDATE_COLLABORATOR,
          payload: data,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `No se pudo editar colaborador. ${error.message}`,
        icon: "error",
        timer: "3000",
        confirmButtonColor: "rgb(187, 131, 43)",
      });
    }
  };
}

export const postCollaborator = (collaboratorData, clubName) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${URL_API}/${clubName}/collaborator`,
        collaboratorData
      );
      if (data) {
        dispatch({
          type: POST_COLLABORATOR,
          payload: data,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `No se pudo crear colaborador. ${error.message}`,
        icon: "error",
        timer: "3000",
        confirmButtonColor: "rgb(187, 131, 43)",
      });
    }
  };
};

export const deleteCollaborator = (idCollaborator, clubName) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `${URL_API}/${clubName}/collaborator/${idCollaborator}`
      );
      if (data) {
        dispatch({
          type: DELETE_COLLABORATOR,
          payload: idCollaborator,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `No se pudo eliminar colaborador!!!!. ${error.message}`,
        icon: "error",
        timer: "3000",
        confirmButtonColor: "rgb(187, 131, 43)",
      });
    }
  };
};

//! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!    PRODUCTS    /////////////////////////
export const getProducts = (clubName) => {
  return async (dispatch) => {
    try {
      console.log("clubName es array", clubName);
      const { data } = await axios.get(
        `${URL_API}/${clubName}/product`
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

export const postProduct = (productData, clubName) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${URL_API}/${clubName}/product`,
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
      Swal.fire({
        title: "Error",
        text: `No se pudo crear el producto. ${error.message}`,
        icon: "error",
        timer: "3000",
        confirmButtonColor: "rgb(187, 131, 43)",
      });
    }
  };
};

export const updateProduct = (productData, idProduct, clubName) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `${URL_API}/${clubName}/product/${idProduct}`,
        productData
      );
      if (data) {
        dispatch({
          type: UPDATE_PRODUCT,
          payload: data,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `No se pudo editar el producto. ${error.message}`,
        icon: "error",
        timer: "3000",
        confirmButtonColor: "rgb(187, 131, 43)",
      });
    }
  };
};

export const deleteProduct = (id, clubName) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `${URL_API}/${clubName}/product/${id}`
      );
      if (data) {
        dispatch({
          type: DELETE_PRODUCT,
          payload: id,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `No se pudo eliminar el producto. ${error.message}`,
        icon: "error",
        timer: "3000",
        confirmButtonColor: "rgb(187, 131, 43)",
      });
    }
  };
};

//! //////////////////////// SUPER ADMIN ////////////////////////////

//? //////////////////////// CREAR BOLICHE ////////////////////////////
export const postBoliche = (boliche, navigate) => {
  const endpoint = `${URL_API}/client`;
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, boliche);
      navigate("/superadmin/dashboard");

      return dispatch({
        type: POST_BOLICHE,
        payload: data,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `No se pudo crear el boliche. ${error.message}`,
        icon: "error",
        timer: "3000",
        confirmButtonColor: "rgb(187, 131, 43)",
      });
    }
  };
};
//? //////////////////////// TRAER BOLICHES ////////////////////////////
export const getBoliches = () => {
  const endpoint = `${URL_API}/client`;

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
//? //////////////////////// BORRAR BOLICHE ////////////////////////////
export const deleteBoliche = (clubName) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`${URL_API}/${clubName}`);
      if (data) {
        dispatch({
          type: DELETE_BOLICHE,
          payload: clubName,
        });
      }
    } catch (error) {
      window.alert(error.message);
    }
  };
};

//? //////////////////////// CREAR ADMIN ////////////////////////////
export const postAdmin = (admin, params, navigate) => {
  const endpoint = `${URL_API}/${params}/administrator`;

  return async (dispatch) => {
    try {
      const data = await axios.post(endpoint, admin);

      navigate("/superadmin/dashboard");
      return dispatch({
        type: POST_ADMIN,
        payload: data,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `No se pudo crear el administrador. ${error.message}`,
        icon: "error",
        timer: "3000",
        confirmButtonColor: "rgb(187, 131, 43)",
      });
    }
  };
};

//? //////////////////////// EDITAR CLUB ////////////////////////////

export const updateClub = (formData, clubName) => {
  const endpoint = `${URL_API}/${clubName}`;

  return async (dispatch) => {
    try {
      const { data } = await axios.put(endpoint, formData);
      return data;
      // handle response data if needed
    } catch (error) {
      console.error(error);
    }
  };
};

//? //////////////////////// EDITAR ADMIN ////////////////////////////

export const updateAdmin = (adminData, idAdmin, clubName) => {
  const endpoint = `${URL_API}/${clubName}/${idAdmin}`;

  return async (dispatch) => {
    try {
      const { data } = await axios.put(endpoint, adminData);
      return data;
    } catch (error) {
      console.error(error);
    }
  };
};

//! logina super admin

export const handleSAdminStatusLogin = () => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: SADMIN_STATUS_LOGIN,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

//! login admin

export const getAdmins = () => {
  const endpoint = `${URL_API}/administrator`;

  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);

      return dispatch({
        type: GET_ADMINS,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: LOG_OUT_ADMIN,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const handleAdminConfigView = () => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: ADMIN_CONFIG_VIEW,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const selectClientAdminName = (client) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: SELECT_CLIENT_ADMIN,
        payload: client,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const adminIdLogged = (adminID) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: ADMIN_ID_LOGGED,
        payload: adminID,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const handleAdminStatusLogin = () => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: ADMIN_STATUS_LOGIN,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

//? //////////////////////// TRAER ADMIN ////////////////////////////
export const getAdministrators = () => {
  const endpoint = `${URL_API}/administrator`;

  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);

      return dispatch({
        type: GET_ADMINISTRATORS,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

//? //////////////////////// TRAER ADMINS DASHBOARD ////////////////////////////

export const setClubID = (clubID) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: SET_CLUB_ID,
        payload: clubID,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

//!Ventas temporario para DEMO

export const getSales = (clubName) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: GET_SALES,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

//! /////////////////////////DELETE ADMINISTRATOR////////////////////////

export const deleteBolicheAdmins = (clubName, id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `${URL_API}/${clubName}/${id}`
      );
      if (data) {
        dispatch({
          type: DELETE_BOLICHE_ADMINS,
          payload: id,
        });
      }
    } catch (error) {
      window.alert(error.message);
    }
  };
};

//! login colaborador

export const getAllColaborators = () => {
  const endpoint = `${URL_API}/collaborator`;

  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      console.log(data, "data");

      return dispatch({
        type: GET_ALL_COLLABORATORS,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const collaboratorIdLogged = (collaboratorID) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: COLLABORATOR_ID_LOGGED,
        payload: collaboratorID,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const handleCollaboratorStatusLogin = () => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: COLLABORATOR_STATUS_LOGIN,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const handleCollaboratorStatusLogout = () => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: COLLABORATOR_STATUS_LOGOUT,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const selectClientColaboratorName = (collaborator) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: SELECT_CLIENT_COLLABORATOR,
        payload: collaborator,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

//! cambio contraseña colaborador

export const changeColaboradorPassword = (clubname, colabname, newPassword) => {
  console.log(newPassword, clubname, colabname, "data")
  const endpoint = `${URL_API}/${clubname}/collaborator/${colabname}`;

  const password = {
    password: newPassword,
  };

  return async (dispatch) => {
    try {
      const { data } = await axios.put(endpoint, password);

      return data;
    } catch (error) {
      console.error(error);
    }
  };
};

////////////////////////QR ACTIONS ///////////////////////////

export const acceptOrder = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `${URL_API}/:client/collaborator/qr/:uuid/accept`
      );
      // console.log(data)
      // if (data) {
      //     dispatch({
      //         type: "ACCEPT_ORDER",
      //         payload: data
      //     })
      // } else {
      //     throw new Error("No se ha aceptado la orden")
      // }
    } catch (error) {
      window.alert("No se ha aceptado la orden. " + error.message);
    }
  };
};

export const rejectOrder = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `${URL_API}/:client/collaborator/qr/:uuid/reject`
      );
      // console.log(data)
      // if (data) {
      //     dispatch({
      //         type: "REJECT_ORDER",
      //         payload: data
      //     })
      // } else {
      //     throw new Error("No se ha rechazado la orden")
      // }
    } catch (error) {
      window.alert("La orden no fue rechazada con exito. " + error.message);
    }
  };
};

//!/////////////////////////  QR ACTIONS ///////////////////////////

export const postOrderInDB = (order, idMP, clubID) => {
  console.log("aqui inicia el order", order, "aqui finaliza", idMP, clubID);
  return async () => {
    try {
      for (const orderItem of order) {
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

export const getOrderQRCode = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${URL_API}/pepe/collaborator/qr/484698956`
      );

      dispatch({ type: GET_ORDER_QR, payload: data });
    } catch (error) {
      console.error(error); // Log the error to the console
      window.alert("No se ha creado la orden. " + error.message);
    }
  };
};

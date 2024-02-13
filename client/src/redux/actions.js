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
} from "./actions-types";

//! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!    COLLABORATORS    /////////////////////////
export const getCollaborators = (clubName) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/${clubName}/collaborator/users`
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
        `http://localhost:3001/${clubName}/collaborator/${idCollaborator}`,
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
        `http://localhost:3001/${clubName}/collaborator`,
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
        `http://localhost:3001/${clubName}/collaborator/${idCollaborator}`
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

export const postProduct = (productData, clubName) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3001/${clubName}/product`,
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
        `http://localhost:3001/${clubName}/product/${idProduct}`,
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
        `http://localhost:3001/${clubName}/product/${id}`
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
  const endpoint = "http://localhost:3001/client";
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, boliche);
      alert("Boliche creado con éxito");
      navigate("/superadmin/dashboard");

      return dispatch({
        type: POST_BOLICHE,
        payload: data,
      });
    } catch (error) {
      console.error(error.message);
      alert("Error al crear el boliche: " + error);
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
//? //////////////////////// BORRAR BOLICHE ////////////////////////////
export const deleteBoliche = (clubName) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`http://localhost:3001/${clubName}`);
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
  const endpoint = `http://localhost:3001/${params}/administrator`;

  return async (dispatch) => {
    try {
      const data = await axios.post(endpoint, admin);
      alert("administrador creado exitosamente!");
      navigate("/superadmin/dashboard");
      return dispatch({
        type: POST_ADMIN,
        payload: data,
      });
    } catch (error) {
      console.error(error.message);
      alert("Error al crear el administrador : " + error.message);
    }
  };
};


//? //////////////////////// EDITAR CLUB ////////////////////////////

export const updateClub = (formData, clubName) => {

  const endpoint = `http://localhost:3001/${clubName}`;

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
  const endpoint = `http://localhost:3001/${clubName}/${idAdmin}`;

  return async (dispatch) => {
    try {
      const { data } = await axios.put(endpoint, adminData);
      return data;

    } catch (error) {
      console.error(error);
    }
  }
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
  const endpoint = "http://localhost:3001/administrator";

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
  const endpoint = "http://localhost:3001/administrator";

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
        `http://localhost:3001/${clubName}/${id}`
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

import axios from "axios";
import Swal from "sweetalert2";
import { GET_PRODUCTS } from "./actionsTypes";

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

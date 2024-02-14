import axios from "axios";
import Swal from "sweetalert2";
import { GET_MY_BOLICHE } from "./actionsTypes";








//! -------------------------------------- BOLICHE ----------------------------------------
export const getMyBoliche = (clubName) => {
    const endpoint = "http://localhost:3001/client";

    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
            const myBoliche = data.find(boliche => boliche.name.toLowerCase() === clubName.toLowerCase())

            return dispatch({
                type: GET_MY_BOLICHE,
                payload: myBoliche,
            });
        } catch (error) {
            console.error(error);
        }
    };
}; 

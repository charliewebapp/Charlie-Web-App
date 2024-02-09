import {
  POST_BOLICHE,
  GET_PRODUCTS,
  POST_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  POST_ADMIN,
  GET_BOLICHES,
  GET_COLLABORATORS,
  POST_COLLABORATOR,
  UPDATE_COLLABORATOR,
} from "./actions-types";

const initialState = {
  boliches: [],
  allBoliches: [],

  allProducts: [],

  administrators: [],
  allAdministrators: [],

  allCollaborators: [],
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    //! /////////////// PRODUCTS ////////////////////
    case GET_PRODUCTS:
      return {
        ...state,
        allProducts: payload,
      };
    case POST_PRODUCT:
      return {
        ...state,
        allProducts: [...state.allProducts, payload],
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        allProducts: [...state.allProducts, payload],
      };
    case DELETE_PRODUCT:
      const noDeletedProducts = state.allProducts.filter(
        (product) => product.id !== payload
      );
      return {
        ...state,
        allProducts: noDeletedProducts,
      };

    //! ///////////////   COLLABORATORS   ////////////////////
    case GET_COLLABORATORS:
      return {
        ...state,
        allCollaborators: payload,
      };
    case POST_COLLABORATOR:
      return {
        ...state,
        allCollaborators: [...state.allCollaborators, payload],
      };
    case UPDATE_COLLABORATOR:
      //REVISAR SI FUNCIONA BIEN LA ACT DE REDUX O SI DEBO FILTRAR Y MODIFICAR SOLO ESE
      return {
        ...state,
        allCollaborators: [...state.allCollaborators, payload],
      };



    //! ///////////////CREAR BOLICHE////////////////////

    case POST_BOLICHE:
      return {
        ...state,
        boliches: [...state.boliches, payload],
        allBoliches: [...state.allBoliches, payload],
      };

    //! ///////////////CREAR ADMINISTRATORS////////////////////

    case POST_ADMIN:
      return {
        ...state,
        administrators: [...state.administrators, payload],
        allAdministrators: [...state.allAdministrators, payload],
      };

    //! ///////////////TRAER BOLICHES////////////////////

    case GET_BOLICHES:
      return {
        ...state,
        boliches: payload,
        allBoliches: payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;

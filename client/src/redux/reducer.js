import {
  POST_BOLICHE,
  GET_PRODUCTS,
  POST_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "./actions-types";

const initialState = {
  boliches: [],
  allBoliches: [],
  allProducts: [],
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
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

    //! ///////////////CREAR BOLICHE////////////////////
    case POST_BOLICHE:
      return {
        ...state,
        boliches: [...state.boliches, payload],
        allBoliches: [...state.allBoliches, payload],
      };

    default:
      return { ...state };
  }
};

export default reducer;

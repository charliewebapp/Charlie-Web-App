import { GET_PRODUCTS, POST_PRODUCT, UPDATE_PRODUCT, GET_ORDER_QR } from "./actions-types";

const initialState = {
  allProducts: [],
  QrCode: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        allProducts: payload,
      }
    case POST_PRODUCT:
      return {
        ...state,
        allProducts: [...state.allProducts, payload],
      }
    case UPDATE_PRODUCT:
      return {
        ...state,
      }
    case GET_ORDER_QR:
      return {
        ...state,
        QrCode: payload,
      }
    default: {
      return { ...state };
    }
  }
}

export default reducer;

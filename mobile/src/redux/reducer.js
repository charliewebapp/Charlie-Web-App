import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  CLEAN_CART,
  GET_MY_BOLICHE,
  POST_USER,
} from "./actionsTypes";

const initialState = {
  allProducts: [],
  cart: [],
  myBoliche: {},
  myUser: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        allProducts: payload,
      };

    case ADD_PRODUCT:
      return {
        ...state,
        cart: payload,
      };

    case REMOVE_PRODUCT:
      const updatedCart = state.cart.filter((item) => item.quantity > 0);
      return {
        ...state,
        cart: updatedCart,
      };

    case CLEAN_CART:
      return {
        ...state,
        cart: [],
      };

    case GET_MY_BOLICHE:
      return {
        ...state,
        myBoliche: payload,
      };
    case POST_USER:
      return {
        ...state,
        myUser: payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;

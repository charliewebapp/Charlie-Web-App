import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  CLEAN_CART,
} from "./actionsTypes";

const initialState = {
  allProducts: [],
  cart: [],
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
      return {
        ...state,
        cart: state.cart.map((item, index) => {
          if (index === payload.productIndex) {
            return {
              ...item,
              quantity: payload.updatedCart[index].quantity,
            };
          }
          return item;
        }),
      };

    case CLEAN_CART:
      return {
        ...state,
        cart: [],
      };

    default:
      return { ...state };
  }
};

export default reducer;

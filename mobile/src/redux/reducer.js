import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  CLEAN_CART,
  GET_MY_BOLICHE,
} from "./actionsTypes";

const initialState = {
  allProducts: [],
  cart: [],
  myBoliche: {},
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

    case GET_MY_BOLICHE:
      return {
        ...state,
        myBoliche: payload
      }

    default:
      return { ...state };
  }
};

export default reducer;


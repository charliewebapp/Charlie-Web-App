import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  CLEAN_CART,
  GET_MY_BOLICHE,
  POST_USER,
  INITIALIZE_CART_FROM_LOCAL_STORAGE,
  SET_CART_FROM_LOCAL_STORAGE, // Agregar esta importación
  GET_ORDER_QR,
  GET_DETAIL_QR,
  GET_ALL_ORDERS,
  GET_MY_BOLICHEID,
} from "./actionsTypes";

const initialState = {
  allProducts: [],
  cart: [],
  myBoliche: {},
  myBolicheID: {},
  myUser: {},
  orderqrdata: [],
  detailQrCode: [],
  allOrders: [],
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

    case INITIALIZE_CART_FROM_LOCAL_STORAGE: // Nuevo case para inicializar el carrito desde localStorage
      return {
        ...state,
        cart: payload,
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
    case GET_ORDER_QR:
      return {
        ...state,
        orderqrdata: payload,
        detailQrCode: [],
      };
    case GET_DETAIL_QR:
      return {
        ...state,
        detailQrCode: payload,
        orderqrdata: [],
      };

    case SET_CART_FROM_LOCAL_STORAGE:
      return {
        ...state,
        cart: payload,
      };

    case SET_CART_FROM_LOCAL_STORAGE:
      return {
        ...state,
        cart: payload,
      };

    case GET_ALL_ORDERS:
      return {
        ...state,
        allOrders: payload,
      };

    case GET_MY_BOLICHEID:
      return {
        ...state,
        myBolicheID: payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;

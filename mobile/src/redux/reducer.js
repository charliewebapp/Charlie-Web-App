import { GET_PRODUCTS } from "./actionsTypes";

const initialState = {
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

    default:
      return { ...state };
  }
};

export default reducer;

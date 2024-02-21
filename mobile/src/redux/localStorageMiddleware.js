// localStorageMiddleware.js

const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type === "ADD_PRODUCT" || action.type === "REMOVE_PRODUCT") {
    const { cart } = store.getState();
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  return result;
};

export default localStorageMiddleware;

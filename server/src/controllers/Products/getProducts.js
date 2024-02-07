const { Product } = require("../../db");

const getProducts = async () => {
  const allProducts = await Product.findAll();
  return allProducts;
};

module.exports = getProducts;


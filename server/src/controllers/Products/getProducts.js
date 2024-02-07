const { Product } = require("../../db");

const getProducts = async () => {
console.log('ejecutando...');
  const allProductos = await Product.findAll();
  console.log(allProductos);
  return allProductos;
};

module.exports = getProducts;


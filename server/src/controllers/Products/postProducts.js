const { Product } = require("../../db");

const postProducts = async function (data) {
  const newProduct = await Product.create(data);
  console.log(Product);
  return newProduct;
};


module.exports = postProducts
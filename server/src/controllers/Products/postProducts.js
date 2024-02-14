const { Product } = require("../../db");
const { Client } = require("../../db");

const postProducts = async function (data,client) {

  const clientSearched = await Client.findOne({where: {name: client}})
  if (!clientSearched) throw new Error("El cliente no existe.");
  const clientId = clientSearched.dataValues.id
  const productExistence = await Product.findOne({where:{name:data.name, ClientId:clientId}})
  if(productExistence) return {error: 'El producto ya existe'}
  const newProduct = await Product.create({ ...data, ClientId: clientId });
  return newProduct;
};


module.exports = postProducts


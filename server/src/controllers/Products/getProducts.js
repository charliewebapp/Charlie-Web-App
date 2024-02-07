const { Product } = require("../../db");
const { Client } = require("../../db");


const getProducts = async (client) => {
  const clientSearched = await Client.findOne({where: { name : client}})
  if (!clientSearched) throw new Error("El cliente no existe.");
  const clientId = clientSearched.dataValues.id
  
  const allProducts = await Product.findAll({where:{ClientId:clientId}});
  
  return allProducts;
};

module.exports = getProducts;


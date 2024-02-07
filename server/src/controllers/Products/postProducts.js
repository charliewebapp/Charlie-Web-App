const { Product } = require("../../db");
const { Client } = require("../../db");

const postProducts = async function (data,client) {
 
  const clientObjetct = await Client.findOne({where: {name: client}})


  if (!clientObjetct) throw new Error("El cliente no existe.");

    
  const clientId = clientObjetct.dataValues.id


  const newProduct = await Product.create({ ...data, ClientId: clientId });

  return newProduct;
};


module.exports = postProducts


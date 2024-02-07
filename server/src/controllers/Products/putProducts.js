const { Client, Product } = require("../../db");

const putProducts = async (client, product, newData) => {
  const clientSearched = await Client.findOne({ where: { name: client } });
  if (!clientSearched) throw new Error("El cliente no existe.");
  const clientId = clientSearched.dataValues.id;

  const updatedProduct = await Product.update(newData, {
    where: {
      ClientId: clientId,
      name: product,
    },
  });

  const updatededProduct = await Product.findOne( {
    where: {
      ClientId: clientId,
      name: product,
    },
  });


  return  updatededProduct

};

module.exports = putProducts;

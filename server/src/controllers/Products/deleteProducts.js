const { Client, Product } = require("../../db");
const { Op } = require("sequelize");

const deleteProducts = async (client, product) => {
  const clientSearched = await Client.findOne({ where: { name: client } });
  if (!clientSearched) throw new Error("El cliente no existe.");
  const clientId = clientSearched.dataValues.id;

  const deletedProduct = await Product.destroy({
    where: {
      ClientId: clientId,
      name: product,
    },
  });
  return deletedProduct;
};
module.exports = deleteProducts;

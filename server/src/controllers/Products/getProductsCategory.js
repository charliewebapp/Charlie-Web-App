const { Client, Product } = require("../../db");

const getProductCategory = async (client, category) => {
  const clientSearched = await Client.findOne({ where: { name: client } });
  if (!clientSearched) throw new Error("El cliente no existe.");
  const clientId = clientSearched.dataValues.id;
  const productsSearched = await Product.findAll({where: {ClientId: clientId}})
  const filtersProductCategory = await productsSearched.filter( cat => cat.dataValues.category  === category )
  const filterDataValues = await filtersProductCategory.map(data => data.dataValues);
  
  return filterDataValues
};
module.exports = getProductCategory;

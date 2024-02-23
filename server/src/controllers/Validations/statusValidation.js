
const { Client } = require("../../db");



const statusValidation = async (client) => {
  const clientSearched = await Client.findOne({where: { name : client}})
  if (!clientSearched) throw new Error("El cliente no existe.");
  const clientStatus = clientSearched.dataValues.status
  
  console.log ("el estatus del cliente es :",clientStatus)
  
  return clientStatus;
};

module.exports = statusValidation;
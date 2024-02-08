const { Administrator , Client} = require("../../db");

const getAdminsClients = async (client) => {
  const clientSearched = await Client.findOne({ where: { name: client } });
  if (!clientSearched) throw new Error("El cliente no existe.");
  const clientId = clientSearched.dataValues.id;
  
  const allAdmins = await Administrator.findAll({where: {  ClientId : clientId}});
  return allAdmins;
};

module.exports = getAdminsClients;

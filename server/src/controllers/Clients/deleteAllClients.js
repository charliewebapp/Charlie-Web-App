const { Client } = require("../../db");

const deleteAllClients = async (client) => {
  console.log(client);
  const clientSearched = client.toLowerCase();
  const clientToDelete = await Client.destroy({
    where: { name: clientSearched },
  });
  if (!clientToDelete) throw new Error(`El cliente ${client} no existe.`);

  return clientToDelete;
};
module.exports = deleteAllClients;

const { Client } = require("../../db");

const putClients = async function (clientId, updatedData) {
  const existingClient = await Client.findByPk(clientId);
  if (!existingClient) {
    throw new Error("Cliente no encontrado");
  }

  await existingClient.update(updatedData);

  return existingClient;
};

module.exports = putClients;

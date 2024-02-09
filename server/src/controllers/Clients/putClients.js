const { Client } = require("../../db");

const putClients = async function (client, newData) {
  const clientSearched = await Client.findOne({ where: { name: client } });
  if (!clientSearched) throw new Error("El cliente no existe.");
  const clientId = clientSearched.dataValues.id;

  const updateClient = await Client.update(newData, {
    where: {
      id: clientId,
    },
  });

  const updatededClient = await Client.findOne( {
    where: {
      id: clientId,
    },
  });


  return  updatededClient
};

module.exports = putClients;

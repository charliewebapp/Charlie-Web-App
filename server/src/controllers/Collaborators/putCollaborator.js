const { Client, Collaborator } = require("../../db");

const putCollaborators = async (client, user, newData) => {
  const clientSearched = await Client.findOne({ where: { name: client } });
  if (!clientSearched) throw new Error("El cliente no existe.");
  const clientId = clientSearched.dataValues.id;

  const updatedProduct = await Collaborator.update(newData, {
    where: {
      ClientId: clientId,
      id: user,
    },
  });

  const updatededProduct = await Collaborator.findOne( {
    where: {
      ClientId: clientId,
      id: user,
    },
  });


  return  updatededProduct

};

module.exports = putCollaborators;

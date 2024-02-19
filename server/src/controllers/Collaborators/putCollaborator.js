const { Client, Collaborator } = require("../../db");

const putCollaborators = async (client, user, newData) => {
  console.log(client, user, newData)
  const clientSearched = await Client.findOne({ where: { name: client } });
  if (!clientSearched) throw new Error("El cliente no existe.");
  const clientId = clientSearched.dataValues.id;

  const updatedProduct = await Collaborator.update(newData, {
    where: {
      ClientId: clientId,
      name: user,
    },
  });

  // const updatededProduct = await Collaborator.findOne({
  //   where: {
  //     ClientId: clientId,
  //     id: user,
  //   },
  // });


  return updatedProduct

};

module.exports = putCollaborators;

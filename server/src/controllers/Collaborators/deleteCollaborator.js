const { Client, Collaborator } = require("../../db");

const deleteCollaborator = async (client, user) => {
  const clientSearched = await Client.findOne({ where: { name: client } });
  if (!clientSearched) throw new Error("El colaborador no existe.");
  const clientId = clientSearched.dataValues.id;

  const deletedProduct = await Collaborator.destroy({
    where: {
      ClientId: clientId,
      id: user,
    },
  });
  return deletedProduct;
};

module.exports = deleteCollaborator;

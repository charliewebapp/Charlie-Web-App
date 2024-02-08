const { Client, Administrator } = require("../../db");

const deleteAdmins = async (client, user) => {
  const clientSearched = await Client.findOne({ where: { name: client } });
  if (!clientSearched) throw new Error("El colaborador no existe.");
  const clientId = clientSearched.dataValues.id;

  const deletedProduct = await Administrator.destroy({
    where: {
      ClientId: clientId,
      id: user,
    },
  });
  return deletedProduct;
};

module.exports = deleteAdmins;

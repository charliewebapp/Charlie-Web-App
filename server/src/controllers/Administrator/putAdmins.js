const { Client, Administrator } = require("../../db");

const putAdmins = async (client, administrator, newData) => {
  const clientSearched = await Client.findOne({ where: { name: client } });
  if (!clientSearched) throw new Error("El cliente no existe.");
  const clientId = clientSearched.dataValues.id;


  const updatedAdmin = await Administrator.update(newData, {
    where: {
      ClientId: clientId,
      id: administrator,
    },
  });

  const updatededAdmin = await Administrator.findOne({
    where: {
      ClientId: clientId,
      id: administrator,
    },
  });

  

  return updatededAdmin;
};

module.exports = putAdmins;

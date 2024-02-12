// const { Client } = require("../../db");

// const deleteAllClients = async (client) => {
//   console.log(client);
//   const clientSearched = client.toLowerCase();
//   const clientToDelete = await Client.destroy({
//     where: { name: clientSearched },
//   });
//   if (!clientToDelete) throw new Error(`El cliente ${client} no existe.`);

//   return clientToDelete;
// };
// module.exports = deleteAllClients;
const { Client, Administrator } = require("../../db");

const deleteAllClients = async (clientName) => {
  try {
    const clientToDelete = await Client.findOne({
      where: { name: clientName },
    });

    if (!clientToDelete) {
      throw new Error(`El cliente ${clientName} no existe.`);
    }

    const clientWithId = clientToDelete.id;

    // Eliminar administradores relacionados
    await Administrator.destroy({
      where: { ClientId: clientWithId },
    });

    // Eliminar el cliente
    await Client.destroy({
      where: { id: clientWithId },
    });

    return `Cliente ${clientName} y sus administradores relacionados eliminados correctamente.`;
  } catch (error) {
    throw error; // Propagar el error hacia arriba
  }
};

module.exports = deleteAllClients;

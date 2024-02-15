const { Client, Administrator, Product } = require("../../db");

const deleteAllClients = async (clientName) => {
  try {
    const clientToDelete = await Client.findOne({
      where: { name: clientName },
    });

    if (!clientToDelete) {
      throw new Error(`El cliente ${clientName} no existe.`);
    }

    const clientWithId = clientToDelete.id;

    await Product.destroy({
      where: { ClientId: clientWithId },
    });
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

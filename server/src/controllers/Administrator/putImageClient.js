const { Client } = require("../../db");

const putClientImage = async (client, newImageUrl) => {
    console.log("clientDelControlles", client);
    console.log(newImageUrl, "newImageUrl");

    const clientSearched = await Client.findOne({ where: { name: client } });

    if (!clientSearched) throw new Error("El cliente no existe.");

    const clientId = clientSearched.dataValues.id;

    console.log("clientid", clientId);
    await Client.update({
        image: newImageUrl,
    }, {
        where: {
            id: clientId
        }
    });
    
    // Actualizar el objeto clientSearched con el nuevo valor de la imagen
    clientSearched.dataValues.image = newImageUrl;

    return clientSearched;
};

module.exports = putClientImage;
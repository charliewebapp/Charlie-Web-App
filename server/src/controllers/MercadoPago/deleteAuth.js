const { Client, Authorizations } = require("../../db");

const deleteAuth = async (req, res) => {
  try {
    const { clubName } = req.body;
    const client = await Client.findOne({
      where: {
        name: clubName,
      },
    });
    const clientId = client.dataValues.id;
    const deleteAuth = await Authorizations.destroy({
      where: {
        ClientId: clientId,
      },
    });

    return res.status(201).json({auth: 'Se ha eliminado Exitosamente la Conexion de Mercado Pago'});
  } catch (error) {
    return res.status(201).json({ error: error.message });
  }
};

module.exports = deleteAuth;

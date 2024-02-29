const { Client, Authorizations } = require("../../db");

const getAuth = async (req, res) => {
  try {
    const { clubName } = req.body;
    const client = await Client.findOne({
      where: {
        name: clubName,
      },
    });
    const clientId = client.dataValues.id;
    const auth = await Authorizations.findOne({
      where: {
        ClientId: clientId,
      },
    });
    return res.status(201).json(auth);
  } catch (error) {
    return res.status(201).json({ error: error.message });
  }
};

module.exports = getAuth;

//si no existe la conexion, se retorna null

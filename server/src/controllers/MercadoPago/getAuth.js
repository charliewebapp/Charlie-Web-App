const { Client, Authorizations } = require("../../db");

const getAuth = async (req, res) => {
  try {
    console.log('estoy aqui ahora');
    const { clubName } = req.body;
    const client = await Client.findOne({
      where: {
        name: clubName,
      },
    });
    logq('estoy aqui')
    const clientId = client.dataValues.id;
    const auth = await Authorizations.findOne({
      where: {
        ClientId: clientId
      }
    })
    return res.status(201).json(auth);
  } catch (error) {
    return res.status(201).json({ error: error.message });
  }
};

module.exports = getAuth;

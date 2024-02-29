const { Client, Authorizations } = require("../../db");

const expires = async (req, res) => {
  console.log("inicia aqui la expiracion");
  try {
    const { clubName } = req.body;
    console.log(clubName);
    const client = await Client.findOne({
      where: {
        name: clubName,
      },
    });

    const clientId = client.dataValues.id;

    const Auth = await Authorizations.findOne({
      where: {
        ClientId: clientId,
      },
    });
    const expires_in = Auth.dataValues.expires_in;

    const dateTime = Auth.dataValues.dateTime;
    // console.log({expires_in, dateTime});

    return res.status(201).json({ expires_in, dateTime });
  } catch (error) {
    console.log("hay un error");
    return res.status(500).json({ error: error.message });
  }
};

module.exports = expires;

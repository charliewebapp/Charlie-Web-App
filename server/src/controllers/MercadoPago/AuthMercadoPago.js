const { MercadoPagoConfig, OAuth } = require("mercadopago");
require("dotenv").config();
const { ACCESS_TOKEN, CLIENT_ID, CLIENT_SECRET, URL_ADMIN } = process.env;
const axios = require("axios");
const { Client, Authorizations } = require("../../db");

const AuthMercadoPago = async (req, res) => {
  try {
    const { code, path } = req.body;
    const searchClient = await Client.findOne({
      where: { name: path },
    });
    const clientId = searchClient.dataValues.id; 

    if(!clientId) throw new Error("El cliente no existe");

    const urlSuccess = `${URL_ADMIN}/admin/dashboardAdmin/mercadopago-authorization/success`;

    const postData = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code,
      grant_type: "authorization_code",
      redirect_uri: urlSuccess,
    };

    const { data } = await axios.post(
      "https://api.mercadopago.com/oauth/token",
      postData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    data.ClientId = clientId;

    const newAutorization = await Authorizations.findOrCreate({
      where: { user_id: data.user_id },
      defaults: data,
    });


    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = AuthMercadoPago;

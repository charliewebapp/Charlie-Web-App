const { MercadoPagoConfig, OAuth } = require("mercadopago");
require("dotenv").config();
const { ACCESS_TOKEN, CLIENT_ID, CLIENT_SECRET } = process.env;
const axios = require("axios");
const { Client, Authorizations } = require("../../db");

const AuthMercadoPago = async (req, res) => {
  try {
    const { code, path } = req.body;

    const searchClient = await Client.findOne({
      where: { name: path },
    });

    const clientId = searchClient.dataValues.id;

    const client = new MercadoPagoConfig({ //creo q no hace falta en esta parte
      accessToken: ACCESS_TOKEN,
      options: { timeout: 5000 },
    });

    const urlDeploy = 'https://51b1-2800-810-498-7dc-6452-efcc-1be-5b86.ngrok-free.app/'
    const urlSuccess = `${urlDeploy}admin/dashboardAdmin/mercadopago-authorization/success`
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

    // const data = {
    //   access_token:
    //     "APP_USR-7378685924902197-021209-90fc5433314244028aefc252ce86ea53-1672284877",
    //   token_type: "Bearer",
    //   expires_in: 15552000,
    //   scope: "offline_access read write",
    //   user_id: 1572284882,
    //   refresh_token: "TG-65ca21f08b82b10001674275-1672284877",
    //   public_key: "APP_USR-1f5e5952-6698-49c2-9b19-af32ab29dece",
    //   live_mode: true,
    // };

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

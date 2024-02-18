const { MercadoPagoConfig, OAuth } = require("mercadopago");
require("dotenv").config();
const { ACCESS_TOKEN, CLIENT_ID, CLIENT_SECRET, URL_ADMIN } = process.env;
const axios = require("axios");
const { Client, Authorizations } = require("../../db");

const AuthMercadoPago = async (req, res) => {
  try {
    const { code, path } = req.body;
    console.log(code, path);
    const searchClient = await Client.findOne({
      where: { name: path },
    });
    const clientId = searchClient.dataValues.id; //agregar control de error si no encuentra el cliente

    // const urlDeploy = 'https://admin-charlie.onrender.com'
    const urlSuccess = `${URL_ADMIN}/admin/dashboardAdmin/mercadopago-authorization/success`;

    const postData = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code,
      grant_type: "authorization_code",
      redirect_uri: urlSuccess,
    };


    const { data, status } = await axios.post(
      "https://api.mercadopago.com/oauth/token",
      postData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (status >= 200 && status < 300) {
      console.log("La petición fue exitosa");
      // Tu lógica aquí para procesar los datos de la respuesta
    } else {
      console.error("La petición falló. Código de estado: " + status);
      // Puedes manejar el error de acuerdo a tus necesidades
    }


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

    console.log(newAutorization);

    return res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = AuthMercadoPago;

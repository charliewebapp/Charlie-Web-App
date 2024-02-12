const { MercadoPagoConfig, OAuth } = require("mercadopago");
require("dotenv").config();
const { ACCESS_TOKEN, CLIENT_ID, CLIENT_SECRET } = process.env;
const axios = require("axios");

const setToken = async (req, res) => {
  try {
    const client = new MercadoPagoConfig({
      accessToken: ACCESS_TOKEN,
      options: { timeout: 5000 },
    });

    const { code } = req.body;
    const redirect_uri =
      "https://admin-charlie.onrender.com/admin/:clubName/dashboardAdmin/success";

    const postData = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code,
      grant_type: "authorization_code",
      redirect_uri: redirect_uri,
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
    //   user_id: 1672284877,
    //   refresh_token: "TG-65ca21f08b82b10001674275-1672284877",
    //   public_key: "APP_USR-1f5e5952-6698-49c2-9b19-af32ab29dece",
    //   live_mode: true,
    // };

    if(data){
      console.log('ususario registrado correctamente');
    }
    console.log(data);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  //guardar datos en db
};

module.exports = setToken;

const { MercadoPagoConfig, OAuth } = require("mercadopago");
require("dotenv").config();
const { ACCESS_TOKEN, CLIENT_ID, CLIENT_SECRET, URL_ADMIN } = process.env;
const axios = require("axios");
const { Client, Authorizations } = require("../../db");

const refreshToken = async (req, res) => {
  try {
    const { clubName } = req.body;
    const url = "https://api.mercadopago.com/oauth/token";
    // const clientID = "9827a4ad-a878-4b7c-a753-feaa4541751a";
    const client = await Client.findOne({
      where: { name: clubName },
    })
    const clientID = client.dataValues.id;
    const Authorization = await Authorizations.findOne({
      where: { ClientId: clientID },
    });
    const refresh_Token = Authorization.dataValues.refresh_token;

    const postData = {
      client_secret: CLIENT_SECRET,
      client_id: CLIENT_ID,
      refresh_token: refresh_Token,
      grant_type: "refresh_token",
    };

    const { data } = await axios.post(url, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(data);
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = refreshToken;

const {
  MercadoPagoConfig,
  OAuth,
  PaymentRefund,
  Payment,
} = require("mercadopago");
const mercadopago = require("mercadopago");
require("dotenv").config();
const { ACCESS_TOKEN, CLIENT_ID, CLIENT_SECRET, URL_ADMIN } = process.env;
const axios = require("axios");
const { Client, Authorizations, Purchase } = require("../../db");
// const mercadoPago = require("mercadopago");
const { v4: uuidv4 } = require("uuid");

const setRefund = async (req, res) => {
  // console.log(mercadoPago);
  try {
    const idempotencyKey = uuidv4();
    const clientID = "87d03f75-42d5-4279-8228-926f6f79c8c5";
    const paymentID = "72771704138";
    const searchPurchase = await Purchase.findOne({
      where: { ClientId: clientID, paymentId: paymentID },
    });
    const clientId = searchPurchase.dataValues.ClientId;
    const amount = searchPurchase.dataValues.amount;
    // console.log(clientId, amount);
    const searchToken = await Authorizations.findOne({
      where: { ClientId: clientId },
    });
    const token = searchToken.dataValues.access_token;

    const client = new MercadoPagoConfig({
      accessToken: token,
    });

    const refund = new PaymentRefund(client);

    refund
      .create({ payment_id: paymentID })
      .then(function (response) {
        console.log(response);
        // Reembolso realizado exitosamente
      })
      .catch(function (error) {
        console.error(error);
        // Manejar errores
      });

    return res.status(201).json(response.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = setRefund;

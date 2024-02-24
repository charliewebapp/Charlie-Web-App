const { Preference, default: MercadoPagoConfig } = require("mercadopago");
const { Client, Authorizations } = require("../../db");
const { URL_CHARLIE } = process.env;
const mercadopago = require("mercadopago");

const PreferenceId = async (req, res) => {
  try {
    const clubName = req.body.path;
    console.log("este es el club Name " + clubName)
    const clientSearched = await Client.findOne({
      where: { name: clubName },
    });
    const clientId = clientSearched.dataValues.id;
   
    const auth = await Authorizations.findOne({
      where: { ClientId: clientId },
    });
    const token = auth.dataValues.access_token;
    console.log ("El token seg Emi es : "+ token)
    const client = new MercadoPagoConfig({
      accessToken: token,
    });

    const products = req.body.products;

    const body = {
      items: products,
      back_urls: {
        success: `${URL_CHARLIE}/${clubName}/orderConfirmation`,
        pending: `${URL_CHARLIE}/${clubName}/cart`,
        failure: `${URL_CHARLIE}/${clubName}/cart`,

      },
      notification_url: `${URL_CHARLIE}/${clubName}/orderConfirmation`,
    };
    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (error) {
    console.log("error => ", error);
    res.status(500).json({
      error: "Error al crear la preferencia :(",
    });
  }
};
module.exports = PreferenceId;

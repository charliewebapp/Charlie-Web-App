const { Preference, default: MercadoPagoConfig } = require("mercadopago");
const { Client, Authorizations } = require("../../db");
const mercadopago = require("mercadopago"); 


const PreferenceId = async (req, res) => {
  try {
    const clubName = req.body.path;
    const clientSearched = await Client.findOne({
      where: { name: clubName },
    });
    const clientId = clientSearched.dataValues.id;
    const auth = await Authorizations.findOne({
      where: { ClientId: clientId },
    });
    const token = auth.dataValues.access_token;

    const client = new MercadoPagoConfig({
      accessToken: token, 
    });

    const products = req.body.products;

    // console.log(products);

    const urlDeploy ="https://0116-2800-810-498-7dc-15ff-5481-8b98-682.ngrok-free.app/";

    const body = {
      items: products,
      back_urls: {
        // success: `${urlDeploy}${clubName}/paymentsuccess`,
        success: `https://www.youtube.com`,
        // failure: "https://www.youtube.com",
        // pending: "https://www.youtube.com",
      },
      // notification_url: `${urlDeploy}${clubName}/paymentsuccess`,
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

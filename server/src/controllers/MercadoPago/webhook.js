const { Preference, default: MercadoPagoConfig } = require("mercadopago");
const {Client , Authorizations} = require("../../db");
// const mercadopago = require("mercadopago"); // require

const webhook =  async( req,res ) => {
    console.log(req.query);
  
    res.send('webhook')


    }

module.exports = webhook


// https://www.youtube.com/?collection_id=72462722840&collection_status=approved&payment_id=72462722840&status=approved&external_reference=null&payment_type=account_money&merchant_order_id=15804592813&preference_id=1681919110-62e9efac-c7f8-4627-a76c-57c21f3b9852&site_id=MLA&processing_mode=aggregator&merchant_account_id=null
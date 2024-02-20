const { Preference, default: MercadoPagoConfig } = require("mercadopago");
const {Client , Authorizations} = require("../../db");
// const mercadopago = require("mercadopago"); // require

const webhook =  async( req,res ) => {

    try {
        console.log(req.query);
      
        res.send('webhook')
    } catch (error) {
        return res.status(500).json({ error: error.message });
        
    }


    }

module.exports = webhook


const { Client, User, QRCode, Purchase } = require("../../db");

const setPurchase = async (req, res) => {
    const {amount, paymentId} = req.body
   
    const newPurchase = await Purchase.create({amount, paymentId})
    
    
};

module.exports = setPurchase;

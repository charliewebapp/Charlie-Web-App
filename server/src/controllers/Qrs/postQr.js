const { QrCode } = require('../../db');

const createQrCode = async (products, totalPrice, status, idMp, ClientId, UserId) => {
    
    const idMercadoPago = Number(idMp)
    
    const newQrCode = await QrCode.create({
        products,
        totalPrice,
        status,
        idMercadoPago,
        ClientId, 
        UserId
    });
    
    return newQrCode;
};

module.exports = createQrCode
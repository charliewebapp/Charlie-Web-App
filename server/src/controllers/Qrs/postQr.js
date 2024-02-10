const { QrCode } = require('../../db');

const createQrCode = async (products, totalPrice, status, idMp) => {
    
    const idMercadoPago = Number(idMp)
    
    const newQrCode = await QrCode.create({
        products,
        totalPrice,
        status,
        idMercadoPago
    });
    
    return newQrCode;
};

module.exports = createQrCode
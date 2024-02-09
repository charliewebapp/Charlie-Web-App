const { QrCode } = require('../../db');

const createQrCode = async (products, totalPrice, status, idMp) => {
    
    const idMercadoPago = Number(idMp)
    console.log(typeof idMercadoPago)
    
    const newQrCode = await QrCode.create({
        products,
        totalPrice,
        status,
        idMercadoPago
    });
    console.log('despues')
    
    return newQrCode;
};

module.exports = createQrCode
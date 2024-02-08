const { QrCode } = require('../../db');

const createQrCode = async (products, totalPrice, status) => {
    
    const newQrCode = await QrCode.create({
        products,
        totalPrice,
        status
    });
    
    return newQrCode;
};

module.exports = createQrCode
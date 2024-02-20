const { QrCode } = require('../../db');

const createQrCode = async (productname, quantity, price, idMP, client) => {

    // const idMercadoPago = Number(idMp)

    const newQrCode = await QrCode.create({
        productname,
        quantity,
        price,
        idMP,
        client
    });

    return newQrCode;
};

module.exports = createQrCode
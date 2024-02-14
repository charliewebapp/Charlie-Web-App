const { QrCode } = require('../../db');

const updateQrCodeStatus = async (idMP, newStatus) => {

    const updatedQr = await QrCode.update(newStatus, {
        where: {
            idMercadoPago: idMP,
        },
    });
    
    const qrCode = await QrCode.findOne({ where: { idMercadoPago: idMP } });

    if (!qrCode) {
        const res = 'No se encontró ningún código QR con ese UUID'
        return res
    }
    // const res = 'Estado del código QR actualizado correctamente'

    return qrCode
};

module.exports = updateQrCodeStatus;
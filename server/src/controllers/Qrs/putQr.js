const { QrCode } = require('../../db');

const updateQrCodeStatus = async (uuid, newStatus) => {

    const updatedQr = await QrCode.update(newStatus, {
        where: {
            id: uuid,
        },
    });
    
    const qrCode = await QrCode.findOne({ where: { id: uuid } });

    if (!qrCode) {
        const res = 'No se encontró ningún código QR con ese UUID'
        return res
    }
    // const res = 'Estado del código QR actualizado correctamente'

    return qrCode
};

module.exports = updateQrCodeStatus;
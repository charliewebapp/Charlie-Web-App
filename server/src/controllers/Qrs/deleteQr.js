const { QrCode } = require('../../db');

const deleteQrCodeIfNotInProgress = async (uuid) => {

    const qrCode = await QrCode.findOne({ where: { id: uuid } });

    if (!qrCode) {
        const res = 'No se encontró ningún código QR con ese UUID'
        return res
    }

    if (qrCode.status !== 'en proceso') {
        await qrCode.destroy();
        const res = 'Código QR eliminado correctamente'
        return res
    } else {
        const res = 'No se puede eliminar el código QR porque está en proceso'
        return res
    }
};

module.exports = deleteQrCodeIfNotInProgress;
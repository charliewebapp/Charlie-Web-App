const { QrCode } = require('../../db');
// const { Collaborator } = require('../../db');

const getQrCodeByUUID = async (uuid) => {
    // const collaborator = await Collaborator.findOne({ where: { id: QrCode.CollaboratorId } });

    // if (collaborator) {            
    const qrCode = await QrCode.findOne({
        where: { id: uuid },
        attributes: ['products', 'totalPrice']
    });

    if (qrCode) {
        return qrCode;
    } else {
        return res.status(404).json({ message: 'No se encontró ningún código QR con ese UUID' });
    }

    // } else {
    //     return res.status(404).json({ message: 'No se encontró el colaborador' });
    // }
};

module.exports = getQrCodeByUUID

// // Middleware de autorización
// const authorizeCollaborator = async (req, res, next) => {
//     try {
//         // Aquí deberías implementar la lógica para verificar si el colaborador tiene acceso al código QR escaneado
//         // Puedes utilizar la información del token de autenticación, el ID del colaborador, etc.
//         // Por ejemplo:
//         // const collaboratorId = req.user.collaboratorId; // Suponiendo que tienes la información del colaborador en el token de autenticación
//         // const qrCodeId = req.params.uuid;
//         // ... Lógica para verificar si el colaborador tiene acceso al código QR ...

//         // Si el colaborador tiene acceso, puedes continuar con la solicitud
//         next();
//     } catch (error) {
//         return res.status(401).json({ error: 'Acceso no autorizado' });
//     }
// };

// // Controlador para buscar un registro por su UUID en la tabla QrCode
// const getQrCodeByUUID = async (req, res) => {
//     try {
//         // Extrae el UUID de los parámetros de la solicitud
//         const { uuid } = req.params;

//         // Busca un registro en la tabla QrCode por su UUID
//         const qrCode = await QrCode.findOne({
//             where: { id: uuid }, // Busca por el campo 'id' que es el UUID
//             attributes: ['products', 'totalPrice'] // Selecciona solo los campos 'products' y 'totalPrice'
//         });

//         // Si se encuentra el registro, envía una respuesta con los datos encontrados
//         if (qrCode) {
//             return res.status(200).json(qrCode);
//         } else {
//             // Si no se encuentra el registro, envía una respuesta indicando que no se encontró
//             return res.status(404).json({ message: 'No se encontró ningún código QR con ese UUID' });
//         }
//     } catch (error) {
//         // Si ocurre un error, envía una respuesta de error
//         return res.status(500).json({ error: 'Error al buscar el código QR por UUID' });
//     }
// };

// module.exports = {
//     getQrCodeByUUID,
//     authorizeCollaborator
// };




// const express = require('express');
// const router = express.Router();
// const { getQrCodeByUUID, authorizeCollaborator } = require('../controllers/qrCodeController');

// // Ruta para obtener un código QR por UUID
// router.get('/:uuid', authorizeCollaborator, getQrCodeByUUID);

// module.exports = router;
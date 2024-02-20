// const postQr = require('../../controllers/Qrs/postQr');

// const postQrHandler = async (req, res) => {
//     try {
//         const { products, totalPrice, status, ClientId, UserId } = req.body;
//         const { idMP } = req.params;

//         const response = await postQr(products, totalPrice, status, idMP, ClientId, UserId);

//         return res.status(201).json(response);
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }

// }

// module.exports = postQrHandler


const postQr = require('../../controllers/Qrs/postQr');

const postQrHandler = async (req, res) => {
    try {
        const { productname, quantity, price } = req.body;
        const { client } = req.params;
        const { idMP } = req.params;

        console.log(productname, quantity, price, idMP, client, "handler")

        const response = await postQr(productname, quantity, price, idMP, client);


        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}

module.exports = postQrHandler
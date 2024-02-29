const putImageClient = require("../../controllers/Administrator/putImageClient");
const cloudinary = require("cloudinary").v2;

const putClientImageHandler = async (req, res) => {
    try {
        if (!req.file) throw new Error("No file uploaded");

        const newImage = await cloudinary.uploader.upload(req.file.path);
        const newData = newImage.url;  // Utiliza solo la URL de la imagen
        console.log(newData);
        const { client } = req.params;
        const clientMinus = client.toLowerCase();

        const updateImage = await putImageClient(clientMinus, newData);
        console.log(updateImage);
        return res.status(201).json(updateImage);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = putClientImageHandler;


const { QrCode } = require("../../db");
const { Client } = require("../../db");


const purchaseByClient = async (req, res) => {
  try {
    
    const { idClient } = req.body; 
   
    const validClient = await Client.findOne({
      where: {
        id: idClient,
      },
    })
    console.log(validClient)
    if (!validClient) return res.status(400).json({ error: "Error en información suministrada" });
   
    const QrCodesByClient = await QrCode.findAll({
      where: {
         // Asume que hay una columna userId en tu modelo QrCode
        ClientId:idClient
      },
    });

  
    return res.status(201).json(QrCodesByClient);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = purchaseByClient;
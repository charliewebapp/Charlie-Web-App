
const { User, Purchase, Client } = require("../../db");


const purchaseByUser = async (req, res) => {
  try {
    
    const {idUser, idClient } = req.body; 

    const validUsers = await User.findOne({
      where: {
        id: idUser,
      },
    })  

    const validClient = await Client.findOne({
      where: {
        id: idClient,
      },
    })
    
    if (!validUsers || !validClient) return res.status(400).json({ error: "Error en información suministrada" });
   
    const QrCodesByUser = await Purchase.findAll({
      where: {
        UserId: idUser, // Asume que hay una columna userId en tu modelo QrCode
        ClientId:idClient
      },
    });

  
    return res.status(201).json(QrCodesByUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = purchaseByUser;
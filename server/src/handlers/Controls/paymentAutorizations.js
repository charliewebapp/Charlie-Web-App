const authorizationValidation = require("../../controllers/Validations/authorizationValidation")
const statusValidation = require("../../controllers/Validations/statusValidation")


const paymentAutorizations = async (req, res) => {
  try {
    const boliche = req.params.client
    console.log(boliche)
    const autorizacion = await authorizationValidation(boliche);
    
    const status = await statusValidation(boliche)
    
    const data = {autorizacion,status}
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = paymentAutorizations;

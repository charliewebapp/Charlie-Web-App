const deleteAdmins = require("../../controllers/Administrator/deleteAdmins");

const deleteAdminsHandler = async (req, res) => {
  try {
  
    const {administratorId} = req.params;
    const deletedController = await deleteAdmins(administratorId);
    console.log(administratorId)
    return res.status(201).json(deletedController);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};  

module.exports = deleteAdminsHandler;

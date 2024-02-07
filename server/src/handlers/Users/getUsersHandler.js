const getUsers = require("../../controllers/Users/getUsers");

const getUsersHandler = async (req, res) => {
  try {
  
    const allUsers = await getUsers();
    if(allUsers.length < 1) return res.status(400).json({error: 'No existen usuarios'})
    return res.status(201).json(allUsers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getUsersHandler;

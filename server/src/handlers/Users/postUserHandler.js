const postUser = require("../../controllers/Users/postUser");

const postUserHandler = async (req, res) => {
  try {
    
    const {id, name, mail, password } = req.body; 
  
    if (!name) return res.status(400).json({ error: "Falta Name" });
    const UserData = {id,name, mail, password}

    const newUser = await postUser(UserData);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postUserHandler;
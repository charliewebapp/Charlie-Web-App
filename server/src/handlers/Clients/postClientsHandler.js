const postClients = require("../../controllers/Clients/postClients");

function convertirAKebabCase(nombre) {
  return nombre
    // Reemplaza los espacios con guiones
    .replace(/\s+/g, '-')
    // Convierte a minúsculas
    .toLowerCase();
}

const postClientsHandler = async function (req, res) {
  try {
    const data = req.body;
    const nameMayus = convertirAKebabCase(data.name);
    const allData = {...data, name:nameMayus}
    const response = await postClients(allData);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postClientsHandler;

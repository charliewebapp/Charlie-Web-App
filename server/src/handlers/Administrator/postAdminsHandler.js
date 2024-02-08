const postAdmins = require("../../controllers/Administrator/postAdmins");

const postAdminsHandler = async function (req, res) {
  try {
    console.log("Contenido de req.body:", req.body);
    const { name_client, password, mail, status } = req.body;

    const nameMinus = name_client.toLowerCase();
    const mailMinus = mail.toLowerCase();
    const { client } = req.params;
    const clientMinus = client.toLowerCase();
    console.log(clientMinus);
    const newAdmin = await postAdmins(
      nameMinus,
      password,
      mailMinus,
      status,
      clientMinus
    );
    res.status(201).json(newAdmin);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Error al crear el Administrador" });
  }
};

module.exports = postAdminsHandler;

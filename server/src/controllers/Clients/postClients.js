const { Client } = require("../../db");

const postClients = async function (name, adress, city, image) {
  const newClient = await Client.create({
    name,
    image: image,
    adress,
    city,
    // Puedes agregar otros campos según sea necesario
  });
  return newClient;
};
module.exports = postClients;

// const newClient = await Client.create({
//   name,
//   image: imagePath,
//   adress,
//   city,
//   // Puedes agregar otros campos según sea necesario
// });

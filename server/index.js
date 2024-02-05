const axios = require("axios");
const server = require("./src/server");
// const { conn } = require('./src/db.js');
const PORT = 3001;
const express = require('express');
const app = express();

// // conn.sync({ force: true }).then(() => {
// // server.listen(PORT, () => {
// //   console.log(`Server listening on port ${PORT}`);
// // })
// // }).catch(error => console.error(error))


// Ruta de ejemplo
app.get('/', (req, res) => {
    res.send('¡Hola, este es tu servidor Express!');
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

const dns = require('node:dns/promises');
dns.setServers(['8.8.8.8', '8.8.4.4']); 

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb+srv://gomezmathiasxd_db_user:2vIrpVr4eqewfTes@cluster0.nakpjjq.mongodb.net/tienda_sena")
    .then(() => console.log("Conexión exitosa"))    
    .catch(err => console.error("No se pudo conectar a Mongo", err))

app.get('/', (req, res) => {
    res.send({ mensaje: "El servidor esta funcionando"});
})

app.get(`/usuarios`, async (req, res) => {
    try {
        const usuarios = await mongoose.connection.db.collection('usuarios').find().toArray();
        res.send(usuarios);
    } catch (error) {
        res.status(500).send({ mensaje: "No se pudieron obtener los usuarios", error: error.mensaje });
    }
});

app.listen(PORT, () => {
    console.log(`El backend está escuchando en localhost: ${PORT}`)
});

app.get("/colecciones", async (req, res) => {
    const colecciones = await mongoose.connection.db.listCollections().toArray();
    res.json(colecciones);
});
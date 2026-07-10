const express = require("express");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Conexión exitosa a MongoDB");
})
.catch((error) => {
    console.error("Error al conectar MongoDB:", error);
});


app.get("/", (req, res) => {
    res.json({
        mensaje: "Servidor funcionando correctamente"
    });
});


app.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await mongoose.connection.db
            .collection("usuarios")
            .find()
            .toArray();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


app.get("/usuarios/:id", async (req, res) => {

    try {
        const usuario = await mongoose.connection.db
            .collection("usuarios")
            .findOne({
                _id: new ObjectId(req.params.id)
            });
        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


app.post("/usuarios", async (req, res) => {
    try {
        const nuevoUsuario = req.body;
        const resultado = await mongoose.connection.db
            .collection("usuarios")
            .insertOne(nuevoUsuario);
        res.status(201).json({
            mensaje: "Usuario creado correctamente",
            id_generado: resultado.insertedId,
            datosGuardados: nuevoUsuario
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


app.put("/usuarios/:id", async (req, res) => {
    try {
        const resultado = await mongoose.connection.db
            .collection("usuarios")
            .updateOne(
                {
                    _id: new ObjectId(req.params.id)
                },
                {
                    $set: req.body
                }
            );
        if (resultado.matchedCount === 0) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }
        res.json({
            mensaje: "Usuario actualizado correctamente",
            modificaciones: resultado.modifiedCount
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


app.delete("/usuarios/:id", async (req, res) => {

    try {
        const resultado = await mongoose.connection.db
            .collection("usuarios")
            .deleteOne({
                _id: new ObjectId(req.params.id)
            });
        if (resultado.deletedCount === 0) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }
        res.json({
            mensaje: "Usuario eliminado correctamente"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


app.get("/colecciones", async (req, res) => {
    try {
        const colecciones = await mongoose.connection.db
            .listCollections()
            .toArray();
        res.json(colecciones);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
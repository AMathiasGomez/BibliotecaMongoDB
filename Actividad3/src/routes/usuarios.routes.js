const express = require('express');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const router = express.Router();

router.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await mongoose.connection.db
            .collection("usuarios")
            .find()
            .toArray();
        res.json({usuarios, timestamp: new Date().toISOString()});
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


router.get("/usuarios/:id", async (req, res) => {

    try {
        const usuario = await mongoose.connection.db
            .collection("usuarios")
            .findOne({
                _id: new ObjectId(req.params.id)
            });
        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado",
                timestamp: new Date().toISOString()
            });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


router.post("/usuarios", async (req, res) => {
    try {
        const nuevoUsuario = req.body;
        const resultado = await mongoose.connection.db
            .collection("usuarios")
            .insertOne(nuevoUsuario);
        res.status(201).json({
            mensaje: "Usuario creado correctamente",
            id_generado: resultado.insertedId,
            datosGuardados: nuevoUsuario,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


router.put("/usuarios/:id", async (req, res) => {
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
            modificaciones: resultado.modifiedCount,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


router.delete("/usuarios/:id", async (req, res) => {

    try {
        const resultado = await mongoose.connection.db
            .collection("usuarios")
            .deleteOne({
                _id: new ObjectId(req.params.id)
            });
        if (resultado.deletedCount === 0) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado", 
                timestamp: new Date().toISOString() 
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


router.get("/colecciones", async (req, res) => {
    try {
        const colecciones = await mongoose.connection.db
            .listCollections()
            .toArray();
        res.json({colecciones, timestamp: new Date().toISOString() })
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;
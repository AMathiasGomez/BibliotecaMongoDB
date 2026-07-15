const Usuario = require("../models/Usuario");

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json({ usuarios, timestamp: new Date().toISOString() });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Error al consultar los usuarios" });
    }
};

const obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado",
                timestamp: new Date().toISOString()
            });
        }
        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al consultar el usuario" });
    }
};

const crearUsuario = async (req, res) => {
    try {
        const nuevoUsuario = await Usuario.create(req.body);
        res.status(201).json({
            mensaje: "Usuario creado correctamente",
            datosGuardados: nuevoUsuario,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error(error);
        // Errores de validación del schema (required, match, enum, etc.)
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: "Error al crear el usuario" });
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!usuarioActualizado) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json({
            mensaje: "Usuario actualizado correctamente",
            datosActualizados: usuarioActualizado,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error(error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: "Error al actualizar." });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuarioEliminado) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado",
                timestamp: new Date().toISOString()
            });
        }
        res.json({
            mensaje: "Usuario eliminado correctamente",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};
const Autor = require("../models/Autor");

const obtenerAutores = async (req, res) => {
    try {
        const autores = await Autor.find();
        res.json({ autores, timestamp: new Date().toISOString() });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Error al consultar los autores" });
    }
};

const obtenerAutorPorId = async (req, res) => {
    try {
        const autor = await Autor.findById(req.params.id);
        if (!autor) {
            return res.status(404).json({
                mensaje: "Autor no encontrado",
                timestamp: new Date().toISOString()
            });
        }
        res.json(autor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al consultar el autor" });
    }
};

const crearAutor = async (req, res) => {
    try {
        const nuevoAutor = await Autor.create(req.body);
        res.status(201).json({
            mensaje: "Autor creado correctamente",
            datosGuardados: nuevoAutor,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error(error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: "Error al crear el autor" });
    }
};

const actualizarAutor = async (req, res) => {
    try {
        const autorActualizado = await Autor.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!autorActualizado) {
            return res.status(404).json({ error: "Autor no encontrado" });
        }
        res.json({
            mensaje: "Autor actualizado correctamente",
            datosActualizados: autorActualizado,
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

const eliminarAutor = async (req, res) => {
    try {
        const autorEliminado = await Autor.findByIdAndDelete(req.params.id);
        if (!autorEliminado) {
            return res.status(404).json({
                mensaje: "Autor no encontrado",
                timestamp: new Date().toISOString()
            });
        }
        res.json({
            mensaje: "Autor eliminado correctamente",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el autor" });
    }
};

module.exports = {
    obtenerAutores,
    obtenerAutorPorId,
    crearAutor,
    actualizarAutor,
    eliminarAutor
};
const Prestamo = require("../models/Prestamo");

const obtenerPrestamos = async (req, res) => {
    try {
        const prestamos = await Prestamo.find()
            .populate("libro_id")
            .populate("usuario_id");
        res.json({ prestamos, timestamp: new Date().toISOString() });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Error al consultar los préstamos" });
    }
};

const obtenerPrestamoPorId = async (req, res) => {
    try {
        const prestamo = await Prestamo.findById(req.params.id)
            .populate("libro_id")
            .populate("usuario_id");
        if (!prestamo) {
            return res.status(404).json({
                mensaje: "Préstamo no encontrado",
                timestamp: new Date().toISOString()
            });
        }
        res.json(prestamo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al consultar el préstamo" });
    }
};

const crearPrestamo = async (req, res) => {
    try {
        const nuevoPrestamo = await Prestamo.create(req.body);
        res.status(201).json({
            mensaje: "Préstamo creado correctamente",
            datosGuardados: nuevoPrestamo,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error(error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: "Error al crear el préstamo" });
    }
};

const actualizarPrestamo = async (req, res) => {
    try {
        const prestamoActualizado = await Prestamo.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!prestamoActualizado) {
            return res.status(404).json({ error: "Préstamo no encontrado" });
        }
        res.json({
            mensaje: "Préstamo actualizado correctamente",
            datosActualizados: prestamoActualizado,
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

const eliminarPrestamo = async (req, res) => {
    try {
        const prestamoEliminado = await Prestamo.findByIdAndDelete(req.params.id);
        if (!prestamoEliminado) {
            return res.status(404).json({
                mensaje: "Préstamo no encontrado",
                timestamp: new Date().toISOString()
            });
        }
        res.json({
            mensaje: "Préstamo eliminado correctamente",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el préstamo" });
    }
};

module.exports = {
    obtenerPrestamos,
    obtenerPrestamoPorId,
    crearPrestamo,
    actualizarPrestamo,
    eliminarPrestamo
};
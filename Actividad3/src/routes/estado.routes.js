const express = require('express');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const router = express.Router();

// Estados válidos para un préstamo. "finalizado" es un estado terminal:
// una vez que un préstamo llega ahí, no se puede volver a modificar.
const ESTADOS_VALIDOS = ["activo", "devuelto", "finalizado"];

router.patch("/actualizar-estado/:id", async (req, res) => {
    try {
        const { estado } = req.body;

        // Validar que el body traiga un estado y que sea uno permitido
        if (!estado || !ESTADOS_VALIDOS.includes(estado)) {
            return res.status(400).json({
                mensaje: `El campo "estado" es obligatorio y debe ser uno de: ${ESTADOS_VALIDOS.join(", ")}`,
                timestamp: new Date().toISOString()
            });
        }

        // 1) Consultar si el recurso existe
        const prestamo = await mongoose.connection.db
            .collection("prestamos")
            .findOne({ _id: new ObjectId(req.params.id) });

        if (!prestamo) {
            return res.status(404).json({
                mensaje: "Préstamo no encontrado",
                timestamp: new Date().toISOString()
            });
        }

        // 2) Condición de negocio: si ya está "finalizado", prohibido modificarlo
        if (prestamo.estado === "finalizado") {
            return res.status(403).json({
                mensaje: "Este préstamo ya está finalizado y no puede modificarse. " +
                         "Un préstamo finalizado es un registro cerrado del historial de la biblioteca.",
                timestamp: new Date().toISOString()
            });
        }

        // 3) Si el estado es válido, actualizar solo ese campo
        const resultado = await mongoose.connection.db
            .collection("prestamos")
            .updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: { estado: estado } }
            );

        res.json({
            mensaje: "Estado del préstamo actualizado correctamente",
            estado_anterior: prestamo.estado,
            estado_nuevo: estado,
            modificaciones: resultado.modifiedCount,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;
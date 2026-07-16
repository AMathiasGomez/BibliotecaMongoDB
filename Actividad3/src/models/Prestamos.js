const mongoose = require("mongoose"),

const prestamoSchema = new mongoose.Schema({
    libro_id: {
        type: mongoose.Schema.types.ObjectId,
        ref: "Libro",
        required: [true, "El prestamo debe estár asociado a un libro"]
    },
    usuario_id: {
        type: mongoose.Schema.types.ObjectId,
        ref: "Usuario",
        required: [true, "El prestamo debe estár asociado a un usuario"]
    },
    prestamo_fecha: {
        type: Date,
        required: [true, "La fecha del prestamo es obligatoria"],
        default: Date.now
    },
    fecha_limite: {
        type: Date,
        required: [true, "La fecha limite de devolución es obligatoria"]
    },
    devolucion_fecha: {
        type: Date,
        default: null
    },
    estado: {
        type: String,
        enum: {
            values: ["activo", "devuelto", "finalizado"],
            message: "El estado '{VALUE} no es válido'"
        },
        default: "activo"
    }
}, {timestamps: true})

module.exports = mongoose.model("Prestamo", prestamoSchema)
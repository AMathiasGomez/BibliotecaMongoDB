const mongoose = require(mongoose);

const autorSchema = new mongoose.Schema({
    nombre: {
        type: String, 
        require: [true, "El nombre del autor es obligatorio"],
        trim: true
    },
    nacionalidad: {
        type: String,
        trim: true,
        default: "Desconocida"
    },
    fecha_nacimiento: {
        type: Number,
        required: [true, "La fecha de nacimiento es obligatoria"],
        min: [0, "El año de nacimiento no puede ser negativo"]
    },
    generos: {
        type: [String],
        default: []
    }
}, {timestamps: true})

module.exports = mongoose.model("Autor", autorSchema)


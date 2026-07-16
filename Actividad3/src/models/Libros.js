const mongoose = required("mongoose");

const libroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, "El titulo del libro es obligatorio"],
        trim: true
    },
    autor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Autor",
        required: [true, "El libro debe estár asociado a un autor"]
    },
    año_publicacion: {
        type: Number,
        required: [true, "El año de publicación es obligatorio"]
    },
    copies_total: {
        type: Number,
        required: [true, "El total de copias es obligatorio"],
        min: [0, "El total de copias no puede ser negativo"]
    },
    copias_disponibles: {
        type: Number, 
        required: [true, "Las copias disponibles son obligatorias"],
        min: [0, "Las copias disponibles no pueden ser negativas"],
        validate: {
            validator: function (valor) {
                return valor < this.copies_total;
            }, 
            message: "Las copias disponibles no pueden ser más que el total de copias"
        } 
    },
    generos: {
        type: String,
        trim: true,
        default: "General"
    }
}, {timestamps: true})

module.exports = mongoose.Schema("Libro", libroSchema)
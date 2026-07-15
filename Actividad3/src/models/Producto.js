const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del producto es obligatorio"],
        trim: true
    },
    precio: {
        type: Number,
        required: [true, "El precio es obligatorio"],
        min: [0, "El precio no puede ser numeros negativos"]
    },
    stock: {
        type: Number,
        default: 0,
    },
    categoria: {
        type: String,
        default: "General"
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Producto", productoSchema);
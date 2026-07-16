const Libro = require("../models/Libro");

const obtenerLibros = async (req, res) => {
    try {
        // Proyección: solo trae los campos que el catálogo necesita
        const libros = await Libro.find({}, "titulo autor_id año_publicado copias_disponibles");
        res.json({ libros, timestamp: new Date().toISOString() });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Error al consultar los libros" });
    }
};

const obtenerLibroPorId = async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.id).populate("autor_id");
        if (!libro) {
            return res.status(404).json({
                mensaje: "Libro no encontrado",
                timestamp: new Date().toISOString()
            });
        }
        res.json(libro);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al consultar el libro" });
    }
};

const crearLibro = async (req, res) => {
    try {
        const nuevoLibro = await Libro.create(req.body);
        res.status(201).json({
            mensaje: "Libro creado correctamente",
            datosGuardados: nuevoLibro,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error(error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: "Error al crear el libro" });
    }
};

const actualizarLibro = async (req, res) => {
    try {
        const libroActualizado = await Libro.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!libroActualizado) {
            return res.status(404).json({ error: "Libro no encontrado" });
        }
        res.json({
            mensaje: "Libro actualizado correctamente",
            datosActualizados: libroActualizado,
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

const eliminarLibro = async (req, res) => {
    try {
        const libroEliminado = await Libro.findByIdAndDelete(req.params.id);
        if (!libroEliminado) {
            return res.status(404).json({
                mensaje: "Libro no encontrado",
                timestamp: new Date().toISOString()
            });
        }
        res.json({
            mensaje: "Libro eliminado correctamente",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el libro" });
    }
};

module.exports = {
    obtenerLibros,
    obtenerLibroPorId,
    crearLibro,
    actualizarLibro,
    eliminarLibro
};
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const middlewareRevision = (req, res, next) => {
    const horaActual = new Date().toLocaleDateString();
    console.log(`[${horaActual}] Peticion entrante: ${req.method} ${req.url}`);
    next();
}
app.use(middlewareRevision);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Conexión exitosa a MongoDB");
})
.catch((error) => {
    console.error("Error al conectar MongoDB:", error);
});

app.get("/", (req, res) => {
    res.json({
        mensaje: "Servidor funcionando correctamente"
    });
});

const healthRoutes = require('./routes/salud');
app.use('/api/v1', healthRoutes);

const usuariosRoutes = require('./routes/usuarios.routes');
app.use('/api/v1/usuarios', usuariosRoutes);

const autoresRoutes = require('./routes/autores.routes');
app.use('/api/v1/autores', autoresRoutes);

const librosRoutes = require('./routes/libros.routes');
app.use('/api/v1/libros', librosRoutes);

const prestamosRoutes = require('./routes/prestamos.routes');
app.use('/api/v1/prestamos', prestamosRoutes);

const estadoRoutes = require('./routes/estado.routes');
app.use('/api/v1', estadoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
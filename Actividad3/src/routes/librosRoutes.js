const express = require('express');
const router = express.Router();

const librosController = require("../controllers/librosController");

router.get("/", librosController.obtenerLibros);
router.get("/:id", librosController.obtenerLibroPorId);
router.post("/", librosController.crearLibro);
router.put("/:id", librosController.actualizarLibro);
router.delete("/:id", librosController.eliminarLibro);

module.exports = router;
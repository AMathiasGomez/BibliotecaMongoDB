const express = require('express');
const router = express.Router();

const autoresController = require("../controllers/autoresController");

router.get("/", autoresController.obtenerAutores);
router.get("/:id", autoresController.obtenerAutorPorId);
router.post("/", autoresController.crearAutor);
router.put("/:id", autoresController.actualizarAutor);
router.delete("/:id", autoresController.eliminarAutor);

module.exports = router;
const express = require('express');
const router = express.Router();

router.get('/api/v1/health', (req, res) => {
    res.status(200).json({ Estado: 'Servidor corriendo correctamente',
    timestamp: new Date().toISOString() });
})

module.exports = router;
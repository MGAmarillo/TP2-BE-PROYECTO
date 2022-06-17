const express = require('express');
const router = express.Router();
const controller = require('../controllers/profesores');

router.get('/', async(req, res) => {
    res.json(await controller.getAllProfesores());
})

router.get('/:id', async(req,res) =>{
    const id = req.params.id;
    res.json(await controller.getDeportesPorNombre(id));
})

module.exports = router;
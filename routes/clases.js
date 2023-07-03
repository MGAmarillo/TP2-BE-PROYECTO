const express = require('express');
const router = express.Router();
const controller = require('../controllers/clases');

router.get('/', async (req, res) => {
    res.json(await controller.getClases());
});

router.get('/porDeporte/:deporte', async (req, res) => {
    res.json(await controller.getClasesPorDeporte(req.params));
});

router.get('/porProfesor/:nombre/:apellido', async (req, res) => {
    res.json(await controller.getClasesPorProfesor(req.params.nombre, req.params.apellido));
});

router.post('/', async (req, res) => {
    res.json (await controller.addClase(req.body));
});

module.exports = router;
const express = require('express');
const router = express.Router();
const controller = require('../controllers/deportes');

//DEPORTES

router.get('/', async(req, res) => {
    res.json(await controller.getDeportes());
})

router.post('/api/deporte', (req, res) => {
    listaDeportes.push(req.body);
    res.json(req.body);
})

router.delete('/api/deporte/:nombre', (req, res) => {
    console.log(req.params.nombre);
    res.json({ ope: "ok" });
})

router.put('/api/deporte/:nombre', (req, res) => {
    listaDeportes.push(req.body);
    res.json({ope:"ok"});
})

module.exports = router;
const express = require('express');
const router = express.Router();
const controller = require('../controllers/alumnos');

/* GET users listing. */
router.get('/', async(req, res) => {
  res.json(await controller.getAllAlumnos());
})

router.get('/:mail', async(req, res) => {
  res.json(await controller.getAlumnoPorMail(req.params.mail));
})

router.post('/', async (req, res)=>{
  const result = await controller.agregarAlumno(req.body);
  res.json(result);
});

router.delete('/:mail', async(req, res) => {
  res.json(await controller.eliminarAlumno(req.params.mail));
})

router.put('/:mail', async(req, res) => {
  res.json(await controller.modificarAlumno(req.params.mail,req.body))
})

module.exports = router;

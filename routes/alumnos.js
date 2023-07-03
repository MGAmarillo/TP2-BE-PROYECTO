const express = require('express');
const router = express.Router();
const controller = require('../controllers/alumnos');

const jwt = require('jsonwebtoken');

const secret = `${process.env.SECRET}`;

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

router.post('/inscribirse/:mail/:id', async(req,res) => {
  res.json(await controller.anotarseEnClase(req.params.mail,req.params.id))
})

router.delete('/cancelarClase/:mail/:id', async(req,res) =>{
  res.json(await controller.cancelarClase(req.params.mail, req.params.id))
})

router.post('/login', async(req,res) =>{
  res.json(await controller.login(req.body.mail,req.body.password))
})

router.get('/verify/token', async(req,res) =>{
  const token = req.headers.authorization.split(" ")[1];
  const payload = jwt.verify(token, secret);

  if(Date.now()>payload.exp){
    return res.status(401).send({error:"Token expirado"})
  }
    res.send("Logeado correcto");
})

module.exports = router;

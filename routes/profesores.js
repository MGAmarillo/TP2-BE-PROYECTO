var express = require('express');
var router = express.Router();
const controller = require('./../controllers/profesores');
const data = require('./../data/profesores');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

router.get('/', async function(req, res, next) {
  res.json(await controller.getProfesores());
});

router.get('/:mail', async function(req, res) {
  res.json(await controller.getProfesorById(req.params.mail));
});

router.post('/', async (req,res) => {
  res.json(await controller.addProfesor(req.body));
});

router.delete('/:mail', async(req, res) => {
  res.json(await controller.deleteProfesor(req.params.mail));
})

router.put('/:mail', async(req, res) => {
  res.json(await controller.modifyProfesor(req.params.mail,req.body))
})

router.post('/altaClase/:mail', async (req,res) => {
    res.json(await controller.crearClase(req.params.mail,req.body));
});

router.delete('/cancelarClase/:mail/:id', async (req, res) => {
  res.json(await controller.cancelarClase(req.params.mail, req.params.id));
});

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
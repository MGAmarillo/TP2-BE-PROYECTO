var express = require('express');
var router = express.Router();
const usersController = require('./../controllers/usuarios');
const data = require('./../data/usuarios');
const auth = require('./../middlewares/Auth');

router.get('/', async function(req, res, next) {
  const users = await usersController.getAllUsuarios();
  res.json(users);
});

router.post('/', async (req,res) => {
  const user = req.body;
  const result = await usersController.addUser(user);
  res.json(result);
});

router.post('/login', async (req,res) => {
  try {
    const user = await data.findByCredential(req.body.mail, req.body.password);
    const token = data.generatedToken(user);
    res.send({user, token});
  } catch (error){
      res.status(401).send(error.message);
  }
})

module.exports = router;
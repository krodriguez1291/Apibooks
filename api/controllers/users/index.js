const express = require('express');
const router = express.Router();
const config = require('./../../../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
router.use(bodyParser.json());

const users = require('./../../services/users')

router.route('/')
.get((req,res)=>{
    res.status(200).send(users.loadUsers());
})
.post((req,res)=>{
    let plainPassword =req.body.password;
    const salt = bcrypt.genSaltSync(config.saltRounds);
    const hash = bcrypt.hashSync(plainPassword, salt);
    let user = {
      username:req.body.username,
      password:hash
    }
    users.newUsers(user);
    res.status(200).send(`Usuario ${user.username} contraseña: ${hash}`);
});

router.route('/login')
.post((req, res)=> {
    if (!!users.loadUsers().find(user => req.body.username && bcrypt.compareSync(req.body.password,user.password))) {
      let t= jwt.sign({ username: req.body.username }, config.tokenKey);
      users.newTokens(t);
      res.status(200).send(`El token: ${t}`);
    } else {
      res.status(500).send(`Usuario o contraseña invalido`);
    }
  });

router.route('/:id')
.get((req,res)=>{
    res.send(`Pagina del usuario ${req.params.id}`);
})
.put((req,res)=>{
    res.send(`Actualizar usuario ${req.params.id}`);
})
.delete((req,res)=>{
    res.send(`Eliminar usuario ${req.params.id}`);
});

module.exports=router;
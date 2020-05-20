const express = require('express');
const router = express.Router();
const fs = require('fs');
const morgan = require('morgan')

const accessLogStream = fs.createWriteStream('./logs/access.log', { flags: 'a' });
// setup the logger
router.use(morgan('combined', { stream: accessLogStream }));

const bodyParser = require('body-parser');
const books = require('./../../services/books');
router.use(bodyParser.json());

router.route('/')
.get((req,res)=>{
    res.status(200).send(books.loadBooks());
})
.post((req,res)=>{
    const user = {
        id: books.arrayLenght(),
        name:req.body.name,
        userId: req.body.author
    };
    books.newBooks(user);
    res.status(200).send('El libro ha sido creado');
});

router.route('/:id')
.get((req,res)=>{
    res.send(`Pagina del libro ${req.params.id}`);
})
.put((req,res)=>{
    res.send(`Actualizar libro ${req.params.id}`);
})
.delete((req,res)=>{
    res.send(`Eliminar libro ${req.params.id}`);
});

module.exports=router;
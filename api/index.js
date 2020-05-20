const express = require('express');
const router = express.Router();

const users = require('./controllers/users');
const tweets = require('./controllers/books');

router.use('/users',users);
router.use('/books',tweets);

module.exports=router;
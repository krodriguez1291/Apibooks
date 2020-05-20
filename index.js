const express = require('express');
const bodyParser = require('body-parser');
const nocache = require('nocache');
const config = require('./config');
const api = require('./api');

const app = express();

//middlewares
const auth = (req, res, next) => {
    //obtener el token de los headers de la petición
    const token = req.headers['x-access-token'];
    let decoded;    
    try{
        decoded = jwt.verify(token, config.tokenKey);
    }catch(error){
        decoded = false;
    }
    !!decoded ? 
        //si la respuesta es válida, continuar
        next()
    :
        //si la respuesta no es válida, responder un mensaje de error
        res.status(500).send('Usuario no autorizado')
    
};

app.use(nocache())
app.use('/api',api);
app.use(bodyParser.json());
app.use(auth);

app.listen(config.port,()=>{
console.log("Servidor Iniciado");
});

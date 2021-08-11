const usuarios = require('./routes/usuarios');
const autenticacion = require('./routes/autenticacion');
const express = require('express');
const cors = require('cors');

const fs = require('fs');
const https = require('https');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use('/api/usuarios', usuarios);
app.use('/api/autenticacion', autenticacion);

const port = 4000;


https.createServer({
    key: fs.readFileSync('my_cert.key'),
    cert: fs.readFileSync('my_cert.crt')
}, app).listen(port, ()=> console.log('Microservicio usuario conectado por el puerto 4000'))

//app.listen(port, ()=>console.log('Microservicio usuario conectado por el puerto 4000'));

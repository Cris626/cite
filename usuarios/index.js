const usuarios = require('./routes/usuarios');
// const autenticacion = require('');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use('/api/usuarios', usuarios);
// app.use('/api/autenticacion', autenticacion);

const port = 4000;

app.listen(port, ()=>console.log('Microservicio usuario conectado por el puerto 4000'));

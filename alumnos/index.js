const postulantes = require('./routes/postulantes');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use('/api/postulantes', postulantes);

const port = 4003;

app.listen(port, ()=>console.log('Microservicio postulante conectado por el puerto 4003'))
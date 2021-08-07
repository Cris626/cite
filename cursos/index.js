// const cursos = require('./routes/cursos');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
// app.use('/api/cursos', cursos);

const port = 4001;

app.listen(port, ()=>console.log('Microservicio curso conectado por el puerto 4001'));
const postulantes = require('./routes/postulantes');
const express = require('express');
const cors = require('cors');

const fs = require('fs');
const https = require('https');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use('/api/postulantes', postulantes);

const port = 4003;

https.createServer({
    key: fs.readFileSync('my_cert.key'),
    cert: fs.readFileSync('my_cert.crt')
}, app).listen(port, ()=> console.log('Microservicio postulante conectado por el puerto 4003'))

// app.listen(port, ()=>console.log('Microservicio postulante conectado por el puerto 4003'))
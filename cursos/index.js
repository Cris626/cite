const cursos = require('./routes/cursos');
const express = require('express');
const cors = require('cors');

const fs = require('fs');
const https = require('https');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use('/api/cursos', cursos);

const port = 4001;

/*https.createServer({
    key: fs.readFileSync('my_cert.key'),
    cert: fs.readFileSync('my_cert.crt')
}, app).listen(port, ()=> console.log('Microservicio curso conectado por el puerto 4001'))*/

app.listen(port, ()=>console.log('Microservicio curso conectado por el puerto 4001'));
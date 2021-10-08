const instructores = require('./routes/instructores');
// const cadetes = require('./routes/cadetes');
const express = require('express');
const cors = require('cors');

const fs = require('fs');
const https = require('https');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use('/api/instructores', instructores);
// app.use('/api/cadetes', cadetes);

const port = 4002;

https.createServer({
    key: fs.readFileSync('my_cert.key'),
    cert: fs.readFileSync('my_cert.crt')
}, app).listen(port, ()=> console.log('Microservicio instructores conectado por el puerto 4002'))

// app.listen(port, ()=>console.log('Microservicio instructores conectado por el puerto 4002'));
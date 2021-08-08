const instructores = require('./routes/instructores');
// const cadetes = require('./routes/cadetes');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use('/api/instructores', instructores);
// app.use('/api/cadetes', cadetes);

const port = 4002;

app.listen(port, ()=>console.log('Microservicio instructores conectado por el puerto 4002'));
const firestore = require('../middlewares/firebase');
const express = require('express');
const bcrypt = require('bcrypt');

const ruta = express.Router();

ruta.get('/extraer-usuarios', (req, res)=>{
    let resul = getData();
    resul.then(users=>{
        res.json({
            users
        })
    }).catch(err=>{
        res.status(400).json({
            err
        })
    })
});

ruta.post('/registrar-usuarios', (req, res)=>{
    let body = req.body;
    let resul = createUser(body);
    resul.then(data=>res.json({
        status: 200
    })).catch(err=>res.status(400).json({
        error: err
    }))
})

async function getData(){
    let doc = await firestore.collection('usuarios').get();
    let data = doc.docs.map(doc=>doc.data());
    return data;
}

async function createUser(body){
    const register = await firestore.collection('usuarios').doc().set({
        contraseña: bcrypt.hashSync(body.contraseña, 10),
        correo: body.correo,
        grado: body.grado,
        nombre: body.nombre,
        rol: body.rol,
    }).then(result=> result).catch(error=> error);
    return register;
}

module.exports = ruta;
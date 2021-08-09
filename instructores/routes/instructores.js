const firestore = require('../middlewares/firebase');
const express = require('express');
const bcrypt = require('bcrypt');

const ruta = express.Router();

ruta.post('/register', (req, res)=>{
    let body = req.body;
    let result = createInstructor(body);
    result.then(data=>res.json({
        status: 200
    })).catch(err=>res.status(400).json({
        error: err
    }))
})

async function createUser(body, password){
    console.log(body, password)
    const register = await firestore.collection('usuarios').doc().set({
        apellido: body.apellido.toUpperCase(),
        contraseña: password,
        correo: body.correo,
        grado: body.grado.value,
        nombre: body.nombre.toUpperCase(),
        rol: 'instructor',
        // rol: body.rol,
    }).then(result=> result).catch(error=> error);
    return register;
}

async function createInstructor(body){
    let password = bcrypt.hashSync(body.contraseña, 10)
    await firestore.collection('instructores').doc().set({
        apellido: body.apellido.toUpperCase(),
        certi: body.certi,
        contraseña: password,
        correo: body.correo,
        edad: body.edad,
        genero: body.genero.value,
        grado: body.grado.value,
        nombre: body.nombre.toUpperCase(),
        servi: body.servi
    }).then(resul=>resul).catch(err=>err);
    const registerUser = await createUser(body, password);
    return registerUser;
}

module.exports = ruta;
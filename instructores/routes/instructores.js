const firestore = require('../middlewares/firebase');
const express = require('express');
const bcrypt = require('bcrypt');

const ruta = express.Router();

ruta.post('/edit', (req, res)=>{
    let body = req.body;
    let result = editInstructor(body);
    result.then(data=>res.json({
        status: 200
    })).catch(err=>res.status(400).json({
        error: err
    }))
})

ruta.post('/register', (req, res)=>{
    let body = req.body;
    let result = createInstructor(body);
    result.then(data=>res.json({
        status: 200
    })).catch(err=>res.status(400).json({
        error: err
    }))
})

async function editInstructor(body) {
    const { instructor } = body;
    const docInstructor = await firestore.collection('instructores').where('apellido', '==', `${instructor.apellido}`).where('nombre', '==', `${instructor.nombre}`).get();
    const docId = docInstructor.docs.map(doc=>doc.id);
    const updateInstructor = await firestore.collection('instructores').doc(`${docId[0]}`).update({
        saltos: instructor.saltos,
        edad: instructor.edad,
        grado: instructor.grado,
        servi: instructor.servi,
        state: instructor.state,
        certi: instructor.certi
    }).then(result=> result).catch(error=> error);
    return updateInstructor;
}

async function createUser(body, password){
    const register = await firestore.collection('usuarios').doc().set({
        apellido: body.apellido,
        contraseña: password,
        correo: body.correo,
        grado: body.grado,
        nombre: body.nombre,
        rol: 'Instructor',
        // rol: body.rol,
    }).then(result=> result).catch(error=> error);
    return register;
}

async function createInstructor(body){
    let password = bcrypt.hashSync(body.contraseña, 10)
    await firestore.collection('instructores').doc().set({
        apellido: body.apellido,
        certi: body.certi,
        contraseña: password,
        correo: body.correo,
        edad: body.edad,
        genero: body.genero,
        grado: body.grado,
        nombre: body.nombre,
        servi: body.servi,
        saltos: body.saltos,
        state: true
    }).then(resul=>resul).catch(err=>err);
    const registerUser = await createUser(body, password);
    return registerUser;
}

module.exports = ruta;
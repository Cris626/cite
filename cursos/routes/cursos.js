const firestore = require('../middlewares/firebase');
const express = require('express');

const ruta = express.Router();

ruta.post('/', (req, res)=>{
    let resul = cursos();
    resul.then(data=>res.json({
        cursos: data
    })).catch(err=>err.status(400).json({err}))
})

ruta.post('/registrar', (req, res)=>{
    let body = req.body;
    let resul = createCourse(body);
    resul.then(data=>res.json({
        status: 200
    })).catch(err=>err.status(400).json({
        error: err
    }))
});

ruta.post('/instructores', (req, res)=>{
    let resul = instructores();
    resul.then(data=>res.json({
        data
    })).catch(err=>err.status(400).json({err}))
});

ruta.post('/:id', (req, res)=>{
    let resul = getCurso(req.params.id);
    resul.then(data=>res.json({
        curso: data
    })).catch(err=>err.status(400).json({err}))
})

ruta.post('/materia/:codigo', (req, res)=>{
    let resul = getCursoId(req.params.codigo);
    resul.then(data=>res.json({
        idCurso: data
    })).catch(err=>err.status(400).json({err}))
})

ruta.post('/update/:id', (req, res)=>{
    let resul = updateDocument(req.params.id, req.body);
    resul.then(data=>res.json({
        status: 200
    })).catch(err=>err.status(400).json({
        error: err
    }))
})

async function updateDocument(id, data){
    const doc = await firestore.collection('materias').doc(`${id}`).update(data).then(resul=> resul).catch(err=>err);
    return doc;
}

async function getCursoId(codigo){
    const doc = await firestore.collection('materias').where('curso_numero','==',`${codigo}`).get();
    let idDocument = doc.docs.map(doc=>doc.id);
    return idDocument[0];
}

async function getCurso(apellido){
    const doc = await firestore.collection('cursos').where('jefe_curso','==',`${apellido}`).get();
    let curso = doc.docs.map(doc=>doc.data());
    return curso;
}

async function course(tipo){
    const fullYear = new Date().getFullYear();
    const cursos = await firestore.collection('cursos').where('tipo', '==', `${tipo}`).get();
    let tipoCurso = cursos.docs.map(doc=>doc.data());
    let version = `${tipo.toUpperCase()}0${tipoCurso.length+1}${fullYear}`
    return version;
}

async function instructores(){
    const doc = await firestore.collection('instructores').get();
    let instructores = doc.docs.map(doc=>doc.data());
    return instructores;
}

async function cursos(){
    const doc = await firestore.collection('cursos').get();
    let cursos = doc.docs.map(doc=>doc.data());
    return cursos;
}

async function createCourse(body){
    const num = await course(body.tipo);
    const register = await firestore.collection('cursos').doc().set({
        tipo: body.tipo,
        apertura_curso: body.apertura_curso,
        cierre_curso: body.cierre_curso,
        fecha_preinscripcion: body.fecha_preinscripcion,
        apertura_psicol: body.apertura_psicol,
        cierre_psicol: body.cierre_psicol,
        apertura_medico: body.apertura_medico,
        cierre_medico: body.cierre_medico,
        apertura_fisico: body.apertura_fisico,
        cierre_fisico: body.cierre_fisico,
        inauguracion: body.inauguracion,
        apertura_tierra: body.apertura_tierra,
        cierre_tierra: body.cierre_tierra,
        apertura_saltos: body.apertura_saltos,
        cierre_saltos: body.cierre_saltos,
        jefe_curso: body.jefe_curso,
        curso_numero: num,
        stado: true
    }).then(resul=> resul).catch(err=>err);
    await firestore.collection('materias').doc().set({
        tipo: body.tipo,
        curso_numero: num,
        jefe_curso: body.jefe_curso,
        status: true,
    })
    return register;
};

module.exports = ruta;
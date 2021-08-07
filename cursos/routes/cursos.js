const firestore = require('../middlewares/firebase');
const express = require('express');

const ruta = express.Router();

ruta.post('/registrar', (req, res)=>{
    let body = req.body;
    let resul = createCourse(body);
    resul.then(data=>res.json({
        status: 200
    })).catch(err=>err.status(400).json({
        error: err
    }))
});

// ruta.post('/', (req, res)=>{
//     let cursos = courseNum('Paracaidista');
//     cursos.then(val=>res.json({
//         res
//     })).catch(err=>res.status(400).json({err}));
// })

async function course(tipo){
    const fullYear = new Date().getFullYear();
    const cursos = await firestore.collection('cursos').where('tipo', '==', `${tipo}`).get();
    let tipoCurso = cursos.docs.map(doc=>doc.data());
    let version = `${tipo.toUpperCase()}0${tipoCurso.length+1}${fullYear}`
    return version;
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
        curso_numero: num
    }).then(resul=> resul).catch(err=>err);
    return register;
};

module.exports = ruta;
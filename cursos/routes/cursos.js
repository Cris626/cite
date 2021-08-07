const firestore = require('../middlewares/firebase');
const express = require('express');

const ruta = express.Router();

ruta.post('/registrar-curso', (req, res)=>{
    let body = req.body;
    let resul = createCourse(body);
    resul.then(data=>res.json({
        status: 200
    })).catch(err=>err.status(400).json({
        error: err
    }))
});

async function createCourse(body){
    const register = await firestore.collection('cursos').doc().set({
        tipo: body.tipo,
        apertura_curso: body.apertura_curso,
        cierre_curso: body.cierre_curso,
        fecha_preinscripcion: body.fecha_preinscripcion,
        apertura_psicol: body.apertura_psicol,
        cierre_psico: body.cierre_psico,
        apertura_medico: body.apertura_medico,
        cierre_medico: body.cierre_medico,
        apertura_fisico: body.apertura_fisico,
        cierre_fisico: body.cierre_fisico,
        inauguracion: body.inauguracion,
        apertura_tierra: body.apertura_tierra,
        cierre_tierra: body.cierre_tierra,
        apertura_saltos: body.apertura_saltos,
        cierre_saltos: body.cierre_saltos,
        jefe_curso: body.jefe_curso
    }).then(resul=> resul).catch(err=>err);
    return register;
};

module.exports = ruta;
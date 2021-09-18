const materias = require('../constants/materias');
const firestore = require('../middlewares/firebase');
const express = require('express');

const ruta = express.Router();

ruta.post('/register', (req, res)=>{
    const bodyPostulante = req.body;
    const resul = setPostulante(bodyPostulante);
    resul.then(value=>res.json({
        value
    })).catch(err=>err.status(400).json({err}))
   
})

ruta.post('/', (req, res)=>{
    let resul = postulantes();
    resul.then(data=>res.json({
        postulantes: data
    })).catch(err=>err.status(400).json({err}))
});

ruta.post('/edit/:ci', (req, res)=>{
    let result = editPostulante(req.params.ci);
    result.then(data=>res.json({
        status: 200
    })).catch(err=>err.status(400).json({err}))
})

async function postulantes(){
    const doc = await firestore.collection('postulantes').where('aceptado','==', false).get();
    let postulantes = doc.docs.map(doc=>doc.data());
    return postulantes;
};

async function editPostulante(ci){
    const doc = await firestore.collection('postulantes').where('ci','==', `${ci}`).get();
    let idPostulante = doc.docs.map(doc=>doc.id);
    const resul = await firestore.collection('postulantes').doc(`${idPostulante}`).update({
        aceptado: true
    }).then(data=>data).catch(err=>err);
    return resul;
};

async function setPostulante(values) {
    const postulante = getPostulante(values.postulantes);
    await postulante.then(async data=>{
        await firestore.collection('alumnos').doc().set({...data, num_casco: values.num_casco});
    }).catch(err=>err);
    const curso = getTipoCurso(values.cursos);
    await setPostulanteCurso({curso, values})
    return 200;
}

/* funcion reutilizable para postulante */

async function getPostulante(ci) {
    const doc = await firestore.collection('postulantes').where('ci','==', `${ci}`).get();
    const idPostulante = doc.docs.map(doc=>doc.id);
    await firestore.collection('postulantes').doc(`${idPostulante}`).update({
        register: true
    });
    const resul = await firestore.collection('postulantes').doc(`${idPostulante}`).get();
    const dataPostulante = resul.data();
    return dataPostulante;
}

/* funcion registrar alumno a los cursos con sus respectivas materias */

async function setPostulanteCurso(data) {
    const { curso, values } = data;
    const docCurso = await firestore.collection('materias').where("curso_numero", "==", `${values.cursos}`).get();
    const idCurso = docCurso.docs.map(doc=>doc.id);
    for (const property in materias[curso]) {
        if (Object.hasOwnProperty.call(materias[curso], property)) {
            const element = materias[curso][property];
            await firestore.collection('materias').doc(`${idCurso}`).collection(`${property}`).doc(`${values.num_casco}`).set(element).then(res=> res).catch(err=>err);
        }
    }
}

/**********************************************/

function getTipoCurso(curso) {
    return curso.split(0)[0];
}


module.exports = ruta;

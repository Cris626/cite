const firestore = require('../middlewares/firebase');
const express = require('express');

const ruta = express.Router();

ruta.post('/', (req, res)=>{
    let resul = postulantes();
    resul.then(data=>res.json({
        postulantes: data
    })).catch(err=>err.status(400).json({err}))
});

ruta.post('/edit/:ci', (req, res)=>{
    let result = editPostulante(req.params.ci);
    result.then(data=>res.json({
        postulantes: data
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



module.exports = ruta;

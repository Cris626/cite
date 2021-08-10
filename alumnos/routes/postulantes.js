const firestore = require('../middlewares/firebase');
const express = require('express');

const ruta = express.Router();

ruta.post('/', (req, res)=>{
    let resul = postulantes();
    resul.then(data=>res.json({
        postulantes: data
    })).catch(err=>err.status(400).json({err}))
});

async function postulantes(){
    const doc = await firestore.collection('postulantes').get();
    let postulantes = doc.docs.map(doc=>doc.data());
    return postulantes;
};

module.exports = ruta;

const firestore = require('../middlewares/firebase');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ruta = express.Router();

ruta.post('/', (req, res)=>{
    let body = req.body;
    let usuario = findByEmail(body);
    usuario.then(data=>{
        if(data.status){
            const passwordValidate = bcrypt.compareSync(body.contraseña, data.usuario[0].contraseña);
            if(!passwordValidate) return res.status(400).json({error: 'Invalido', msj: 'Correo o contraseña incorrecta'})
            const jwToken = jwt.sign({
                data: { grado: data.usuario[0].grado, nombre: data.usuario[0].nombre, rol: data.usuario[0].rol}
            }, 'keyPassword', {expiresIn: '1h'});
            res.json({
                jwToken,
                email: data.usuario[0].correo
            })
        }else{
            res.json({
                error: 'Invalido',
                msj: 'Correo o contraseña incorrecta'
            })
        }
    }).catch(err=>{
        res.status(400).json({
            err
        })
    })
})

async function findByEmail(body){
    let doc = await firestore.collection('usuarios').where('correo', '==', `${body.correo}`).get();
    let usuario = doc.docs.map(doc=>doc.data());
    if(usuario.length>0){
        return {usuario, status: true}
    }else{
        return {status: false}
    }
}

module.exports = ruta;

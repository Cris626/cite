const firestore = require('../middlewares/firebase');
const express = require('express');
const ruta = express.Router();
const bcrypt = require('bcrypt');

ruta.post('/', async (req, res)=>{
    const {email, newPassword} = req.body;
    const result = await Promise.resolve(registerNewPassword(email, newPassword));
    res.json({
        status: result
    })
});

async function registerNewPassword(email, password) {
    const userId = await Promise.resolve(getUserId(email));
    if(userId){
        const newPassword = bcrypt.hashSync(password, 10);
        await firestore.collection('usuarios').doc(userId).update({
            correo: email,
            contraseña: newPassword
        });
        return true;
    }
    return false;
}

async function getUserId(email) {
    const doc = await firestore.collection('usuarios').where('correo', '==', `${email}`).get();
    const usuario = doc.docs.map(doc=>doc.id);
    return usuario[0];
}

module.exports = ruta;

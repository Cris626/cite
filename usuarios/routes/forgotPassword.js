const firestore = require('../middlewares/firebase');
const express = require('express');
const ruta = express.Router();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

ruta.post('/sendEmail', async (req, res)=>{
    const {email} = req.body;
    const code = await Promise.resolve(generateCode(email));
    if(code){
        const sendEmail = await Promise.resolve(sendEmailVerification(email, code));
        return res.json({
            ...sendEmail
        })
    }else{
        return res.json({
            code: 'error',
            data: false
        })
    };
});

ruta.post('/:correo/sendCode', async (req, res)=>{
    const correo = req.params.correo;
    const {code} = req.body;
    console.log(correo, code)
    res.json({
        data: '222'
    })
})

async function sendEmailVerification(email, code) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'cite.test123@gmail.com',
            pass: '@cite-test1235',
        },
    });
    const mailOptions = {
        from: 'cite.test123@gmail.com',
        to: `${email}`,
        subject: 'Restauracion de contraseña',
        html: `<h2>Copie y pegue el siguiente codigo para restablecer su contraseña:</h2><h1> ${code}</h1>`
    };
    return await transporter.sendMail(mailOptions);
};

async function generateCode(email) {
    const code =  Math.floor(100000 + Math.random() * 900000);
    const emailId = await getUserId(email);
    if(emailId){
        await firestore.collection('usuarios').doc(emailId).update({code});
        return code;
    }else{
        return false;
    }
}

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

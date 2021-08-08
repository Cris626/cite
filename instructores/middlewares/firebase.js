const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyB5LiD6axDVuI-8ScS_tYjGtOL11KtbF8A",
    authDomain: "cite-db.firebaseapp.com",
    projectId: "cite-db",
    storageBucket: "cite-db.appspot.com",
    messagingSenderId: "534496282407",
    appId: "1:534496282407:web:4e8def115336a63ac48b02"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

module.exports = firestore;
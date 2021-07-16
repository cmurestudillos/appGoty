"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
// Configuracion del EndPoint para el acceso a la BBDD
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://appgoty-5442a.firebaseio.com"
});
// Creamos la referencia de la BBDD
const db = admin.firestore();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send({
        mensaje: '¡¡¡Hola Mundo desde Cloud Functions!!!'
    });
});
exports.getGoty = functions.https.onRequest(async (request, response) => {
    // const nombre = request.query.nombre || 'Sin nombre';
    // response.json({
    //   nombre
    // })
    const gotyRef = db.collection('goty');
    const docsSnap = await gotyRef.get();
    const juegos = [];
    docsSnap.docs.map(doc => {
        juegos.push(doc.data());
    });
    response.json(juegos);
});
// Servidor Express
// Configuracion inicial
const app = express();
app.use(cors({
    origin: true
}));
// Peticion GET
app.get('/goty', (async (req, res) => {
    const gotyRef = db.collection('goty');
    const docsSnap = await gotyRef.get();
    const juegos = [];
    docsSnap.docs.map(doc => {
        juegos.push(doc.data());
    });
    res.json(juegos);
}));
// Peticion POST
app.post('/goty/:id', (async (req, res) => {
    const id = req.params.id;
    const gameRef = db.collection('goty').doc(id);
    const gameSnap = await gameRef.get();
    //Validaciones
    if (!gameSnap.exists) {
        res.status(404).json({
            ok: false,
            mensaje: 'No existe el juego con el id ' + id
        });
    }
    else {
        // comprobacion de que hace el post correctamente
        // res.status(200).json({
        //   ok: true,
        //   mensaje: 'El juego con el id ' + id + ' existe.'
        // });
        const juego = gameSnap.data() || { votos: 0 };
        await gameRef.update({
            votos: juego.votos + 1
        });
        res.json({
            ok: true,
            mensaje: `Gracias por tu voto a ${juego.nombre}`
        });
    }
}));
exports.api = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map
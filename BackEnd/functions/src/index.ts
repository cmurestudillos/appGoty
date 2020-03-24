import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";

// Configuracion del EndPoint para el acceso a la BBDD
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://appgoty-5442a.firebaseio.com"
})

// Creamos la referencia de la BBDD
const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send({
   mensaje: '¡¡¡Hola Mundo desde Cloud Functions!!!'
  });
});

export const getGoty = functions.https.onRequest( async (request, response) => {
  // const nombre = request.query.nombre || 'Sin nombre';
  // response.json({
  //   nombre
  // })

  const gotyRef = db.collection('goty');
  const docsSnap = await gotyRef.get();

  const juegos: any[] = [];
  docsSnap.docs.map( doc => {
    juegos.push(doc.data())
  });
  response.json(juegos);

 });

 // Servidor Express
 // Configuracion inicial
 const app = express();
 app.use(cors({
   origin:true
  }));

  // Peticion GET
  app.get('/goty', (async (req:any, res:any) => {
    const gotyRef = db.collection('goty');
    const docsSnap = await gotyRef.get();

    const juegos: any[] = [];
    docsSnap.docs.map( doc => {
      juegos.push(doc.data())
    });
    res.json(juegos);

  }));

  // Peticion POST
  app.post('/goty/:id', (async (req:any, res:any) => {
    const id = req.params.id;
    const gameRef = db.collection('goty').doc(id);
    const gameSnap = await gameRef.get();

    //Validaciones
    if(!gameSnap.exists){
      res.status(404).json({
        ok: false,
        mensaje: 'No existe el juego con el id ' + id
      });
    }else{
      // comprobacion de que hace el post correctamente
      // res.status(200).json({
      //   ok: true,
      //   mensaje: 'El juego con el id ' + id + ' existe.'
      // });
      const juego = gameSnap.data() || {votos: 0};
      await gameRef.update({
          votos: juego.votos + 1
      });
      res.json({
        ok: true,
        mensaje: `Gracias por tu voto a ${juego.nombre}`
      });
    }

  }));

export const api = functions.https.onRequest(app);

'use strict';

// 1) Conexión a la base de datos 
const dbConnection = require('./lib/connectMongoose');

// 2) Modelo de agentes
const Anuncio = require('./models/Anuncio'); // cargamos el modelo (estructura) de base de datos
const anuncioData = require('./anunciosIniciales.json'); // cargamos los datos por defecto (*)

main().catch(err => console.log('Hubo un error al crear la BD por defecto', err));

async function main() {
    await initAnuncios(); // ejecutamos la funcion que crea y llena la bbdd por defecto (**)
    dbConnection.close(); // cerramos la conexión con mongoDB! IMPORTANTE
};

// 2.1) Función que crea y llena la bbdd... (**)
async function initAnuncios() {
    // elimino todos los registros (documentos) de la colección (tabla) de anuncios para vaciar la bbdd
    const deleted = await Anuncio.deleteMany();
    console.log(`Eliminados ${deleted} anuncios`);

    // crear anuncios iniciales usando los datos cargados por defecto:
    const anuncios = await Anuncio.insertMany(anuncioData.anuncios); // hay que pasarle un array con los datos que saldrán en la bbdd (*)
    console.log(`Creados ${anuncios.length} anuncios.`);
};
'use strict';

// 1) cargo el módulo Mongoose
const mongoose = require('mongoose');

// 2) emite un event que atrapamos con .on
mongoose.connection.on('error', err => {
    console.log('Error de conexión', err);
    process.exit(1); // salimos de la aplicacion si hay un error
});

mongoose.connection.once('open', () => {
    console.log('Usuari@, te has conectado a MongoDB. Nombre de collection:', mongoose.connection.name);
})

// 3) me conecto a la base de datos:
mongoose.connect('mongodb://localhost/nodepop', {})

// Lo hacemos exportable
module.exports = mongoose.connection; // mongoose.connection es un objeto
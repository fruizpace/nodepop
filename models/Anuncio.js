'use strict';
const mongoose = require('mongoose'); // descargamos libreria mongoose

// 1) Crear un esquema (schema): definimos variables y nombre de la tabla (collection)
const anuncioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Indicar nombre del anuncio']
    },
    venta: {
        type: Boolean,
        required: [true, 'Para venta poner "true". Para búsqueda poner "false"']
    },
    precio: {
        type: Number,
        required: [true, 'Indicar precio']
    },
    foto: {
        type: String,
        required: [false, 'Ej.: objeto.png']
    },
    tags: [String]
},
    { collection: 'anuncios' });

// 2) Método estático para hacer skip, limit, sort, etc...
anuncioSchema.statics.lista = function (filtro, skip, limit, select, sort) {
    const query = Anuncio.find(filtro);
    query.skip(skip);
    query.limit(limit);
    query.select(select);
    query.sort(sort);

    return query.exec();
};

// 3) creamos el modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema); // Anuncio = nombre del modelo (está en mayúscula la primera letra)

// 4) exportamos el modelo
module.exports = Anuncio;
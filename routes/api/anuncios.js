'use strict';

const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio'); // importo el modelo de bbdd creado
const utils = require('../../lib/utils'); // funciones que he creado

const referenceTags = ["mobile", "lifestyle", "motor", "work"]; // tags de referencia


// Middlewares-----------------------------------------------
// 1) Lista de anuncios y filtros: GET --->  /api/anuncios 
router.get('/', async (req, res, next) => {
    try {
        const nombre = req.query.nombre; // capturamos el valor de la variable 
        const venta = req.query.venta;
        const precio = req.query.precio;
        const tags = req.query.tags;
        const skip = parseInt(req.query.skip); // captura valor (string) de skip (paginación!). No es una variable de mi bbdd.

        const limit = parseInt(req.query.limit); // capturar valor de limit que ponga el usuario
        const select = req.query.select; // muestra solo las variables que quiere el usuario.
        const sort = req.query.sort; // capturamos el valor de sort si queremos ordenar

        const filtro = {}; // filtro vacío. Si no pasan nada, da la lista completa.

        if (nombre) {
            filtro.nombre = new RegExp('^' + nombre, "i"); // a) añade a filtro vacío el {name: name}
        };

        if (venta) {
            filtro.venta = venta; // b) añade a filtro el {venta: venta}
        };

        if (precio) {
            filtro.precio = utils.revisarPrecio(precio); // c) añade a filtro el {precio: precio} o {precio:{$gte: , $lte: }}
        };

        if (tags) { // Importante!!: el separador es ";"
            let tmp = {};
            //let referenceTags = ["mobile", "lifestyle", "motor", "work"];
            let checker = (arr, target) => target.every(v => arr.includes(v)); // comprobar si los elementos están en la referencia

            var listaTag = tags.split(/\s*;\s*/); // result: ["mobile", "lifestyle", "motor"] sin espacios en blanco y separado.

            if (checker(referenceTags, listaTag)) {
                tmp.$in = listaTag; // $in sirve para buscar "tag1 OR tag2 OR tag3 OR tag4"
                filtro.tags = tmp; // c) añade a filtro el {tag: ["tag1", "tag2", "tag3"]}
            } else {
                next(new Error(`tag not included. Choose: ${referenceTags}`));
            }
        };

        const anuncios = await Anuncio.lista(filtro, skip, limit, select, sort); //  encuentra el anuncio con estos parametros enviados por el usuario
        res.json({ results: anuncios }); // envia respuesta como un json

    } catch (err) { // gestión del error!
        next(err); // nos lleva a "error handler" del app.js
    }
});


// 2) Crear un anuncio: POST ---> /api/anuncios
router.post('/', async (req, res, next) => {
    try {
        const anuncioData = req.body; // objeto con los datos que quiero que tenga
        const anuncio = new Anuncio(anuncioData); // creo un objeto de tipo Anuncio en MEMORIA!

        // valido el precio:
        if (anuncio.precio < 0) {
            res.json({ error: 'negative number' });
            return;
        };

        // valido venta (true or false):
        if (typeof anuncio.venta !== "boolean") {
            res.json({ error: 'venta = true or false' });
            return;
        };

        // validar tags: tiene que estar en la lista de referencia
        let checker = (arr, target) => target.every(v => arr.includes(v));
        if (!checker(referenceTags, anuncio.tags)) {
            res.json({ error: 'Choose: mobile, lifestyle, motor, work' });
            return;
        }

        const anuncioCreado = await anuncio.save(); // grabado en la bbdd
        res.status(201).json({ result: anuncioCreado }); // devuelve objeto con los datos añadidos a mi bbdd en pantalla y status 201 = creado.

    } catch (err) {
        next(err);
    }
});

module.exports = router;
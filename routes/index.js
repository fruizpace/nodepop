'use strict';

var express = require('express');
var router = express.Router();

const Anuncio = require('../models/Anuncio'); // importar mi modelo de base de datos creado
const utils = require('../lib/utils'); // funciones auxiliares que he creado

/* GET home page. Muestra de cómo quedan los anuncios en un archivo html renderizado */
router.get('/', async (req, res, next) => {
  try {
    const filtro = {}; // filtro vacío da la lista completa de anuncios.
    const anuncios = await Anuncio.lista(filtro);
    res.locals.title = 'Nodepop'
    res.render('index', { anuncios }); // envia respuesta renderizada en index.html

  } catch (err) { // gestión del error!
    next(err); // nos lleva a "error handler" del app.js
  }
});

module.exports = router;
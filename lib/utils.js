'use strict';

// 1) Funcion 
function isAPIrequest(req) {
    return req.originalUrl.startsWith('/api/'); // boolean result
}

// 2) Función para transformar el precio en query con rango gte y lte
function revisarPrecio(price) {
    if (price.includes('-')) {
        let precioSplit = price.split('-').map(Number); // [0, 10] el símbolo menos (-) pasa a ser cero.
        //console.log(precioSplit);

        var paramPrecio = {};

        if (precioSplit[0] > 0) {
            paramPrecio.$gte = precioSplit[0]; // gte = greater than...
        }

        if (precioSplit[1] > 0) {
            paramPrecio.$lte = precioSplit[1]; // lte = less than...
        }

        return paramPrecio; // Ej: {precio:{$gte:10, $lte:50}}
    }

    return parseInt(price);
}
//console.log(revisarPrecio(precio));

module.exports = { isAPIrequest, revisarPrecio }; // exportamos funciones
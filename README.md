# PRÁCTICA: INTRODUCCIÓN A NODE.JS

## Objetivo
Desarrollar una API que se ejecutará en el servidor de un servicio de venta de artículos de segunda mano llamado ***Nodepop***.

Este servicio mantiene anuncios de compra o venta de productos guardados en la base de datos. También permite buscar anuncios usando diversos filtros. 

## Inicio
---

- Crea una copia local del repositorio ejecutando con GIT:

  - Para **HTTPS** ejecuta: `git clone https://github.com/fruizpace/nodepop.git`
  - Para **SSH** ejecuta:  `git clone git@github.com:fruizpace/nodepop.git`

- Desde el terminal de Visual Studio instala las dependencias con `npm install`
  
- ***Recomendación*** Si es la primera vez que ejecutas el proyecto, hay que generar la base de datos por defecto con el *script* `npm run initDB`

- Por defecto la aplicación usará el puerto PORT `3000` y generará una base de datos llamada `nodepop` con datos de 3 anuncios: bicicleta, laptop y iPhone.

- Ejecuta el *script* `npm run dev`


## ***SCRIPTS disponibles***
---

`npm start` --> Se ejecutará el archivo `bin/www`. Abrimos el navegador e introducimos `localhost:3000` o `127.0.0.1:3000` y nos aparecerá la página principal de **Nodepop**.

`npm run dev` --> Similar a `npm start` usado para desarrollo usando `nodemon`

`npm run initDB` --> Inicializará la base de datos introduciendo 3 anuncios por defecto en nuestra base de datos.

## ***Rutas***
---

- `localhost:PORT`:

Página inicial del proyecto que muestra el listado de artículos generados por defecto con el script `npm run installDB` o los que haya en la base de datos.

- `localhost:PORT/api/anuncios`:

Listado de artículos en formato `JSON`

- `localhost:PORT/images/<nombreimagen>`

Muestra la imagen de productos guardada en la carpeta ***public*** `/images`. Hay que indicar el nombre. Por ejemplo: `localhost:PORT/images/bici.jpg`


## ***Uso de filtros (GET)***
---
**Nota**: Los filtros para hacer búsquedas de productos sólo son funcionales en la ruta de api/anuncios y no en la página principal.

La estructura de los filtros es:
- `localhost:PORT/api/anuncios/?parametro1=valor&parametro2=valor`


  ### Parametros de filtrado permitidos:

    - ***nombre*** (string): se puede indicar todo el nombre del producto o las primeras letras. Ejemplo: `nombre=ip` dará productos cuyo nombre empiece con "ip" como iPhone.
  
    - ***venta*** (boolean): sólo reconoce los valores ***true*** o ***false***.

    - ***precio*** (number): Acepta valores superiores a cero. A continuación las formas de indicar el precio en el filtro.

    ```
    precio=50 ==> Busca el precio exacto.

    precio=50- ==> Busca artículos con un precio mayor o igual que 50.

    precio=50-200 ==> Busca articulos con un precio entre 50 hasta 200.

    precio=-200 ==>  Busca artículos con un precio menor o igual que 200.
    ```

    - ***tags*** (string): Sólo hay 4 tags (etiquetas) aceptadas: *work,  lifestyle, mobile y motor*. Los tag se deben separar con un punto y coma (;) y pueden haber espacios en blanco entre los tags.
    Si el tag no está en la lista, dará error.
       - Ejemplo: `localhost:3000/api/anuncios?tags=work; motor` este filtro dará como resultado todos los anuncios que contengan la etiqueta *work* o *motor*.

    - ***start*** (number): Número de anuncios a 'saltarse' de la lista.

        - `http://localhost:PORT/?precio=100-2500&start=2`

    - ***limit*** (number): Cantidad máxima de anuncios a mostrar.

        - `http://localhost:PORT/?precio=100-2500&limit=2`

    - ***sort*** (string): Ordenar por `nombre` o `precio`. Si escribimos `sort=nombre` se ordenará por orden alfabético. `sort=precio`, de menor a mayor. Para ordenarlo al revés sólo hay que añadir un menos a la variable:  `sort=-nombre` o  `sort=-precio`

  
## ***Crear nuevos anuncios (POST)***

  - ***Si usas POSTMAN***
    - Crea una cuenta en [POSTMAN](https://www.postman.com)

    - La url donde hacer la petición ***POST*** será `http://localhost:3000/api/anuncios`

    - Selecciona la pestaña ***BODY*** y marca el tipo de codificación `x-www-form-urlencoded`

    - En ***KEY*** escribe el nombre del párametro y en ***VALUE*** indica el valor que le quieras asignar.

    - Puedes añadir hasta 5 parámetros: nombre, venta, precio, foto y tags.

      > Recuerda: El parámetro ***venta*** es booleano y sólo acepta en minúsculas ***true*** o ***false***.

      > Si quieres añadir una foto al nuevo artículo, en ***foto*** indica el nombre de la imagen con su extensión. Por ejemplo: chaqueta.png o chaqueta.jpg. Luego añade el archivo de imagen en la carpeta `public/images`.

      > Para añadir más de un ***tag*** hemos de pasarle tantas ***KEY*** y ***VALUE*** como tags queramos. Ejemplo abajo:

    *key : value*
      - nombre : Chaqueta motera
      - venta: true
      - precio: 35.00
      - tags: lifestyle
      - tags: motor

- Si todo está correcto, se mostrará el anuncio nuevo en formato JSON.
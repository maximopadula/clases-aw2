/*
    MÓDULO: RUTAS (Enrutador)
    - ¿Qué es una ruta?: Es la puerta de entrada a la aplicación. Mapea una URL y un método HTTP (ej. GET) con una acción específica.
    - ¿Qué hace este módulo?: Inicia el servidor, recibe las peticiones del usuario y las redirige hacia el middleware y el controlador correspondiente.
*/

import express from 'express'
import { devolverCohetes, devolverCohetePorId, devolverCoheteMasAlto } from './controladores.mjs'
import { verificarExistenciaCohete } from './middlewares.mjs'

// Definimos el puerto en el que correrá nuestro servidor
const PUERTO = 3000

/*
    Instanciamos la aplicación de Express.
    El objeto 'app' nos permite configurar las rutas y arrancar el servidor.
*/
const app = express()

// Rutas REST clásicas utilizando el método GET
app.get("/api/v1/cohetes", devolverCohetes)

/*
    Ruta con parámetro dinámico (:id).
    Acá inyectamos el middleware "verificarExistenciaCohete" para que se ejecute justo antes del controlador "obtenerCohetePorId".
*/
app.get("/api/v1/cohetes/:id", verificarExistenciaCohete, devolverCohetePorId)

/*
    Endpoint orientado a procedimientos.
    Es una ruta separada de la API REST clásica, que ejecuta una acción específica (en este caso, un algoritmo que compara las alturas de los cohetes).
*/
app.get("/obtener-cohete-mas-alto", devolverCoheteMasAlto)

/*
    Iniciamos el servidor para que escuche peticiones en el puerto asignado.
*/
app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`)
})

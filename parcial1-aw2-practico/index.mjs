/*
    MÓDULO: INDEX
    - Inicia el servidor, recibe las peticiones del usuario y las redirige hacia el middleware y el callback correspondiente.
*/

import express from 'express'
import { enviarCohetes, enviarCohetePorId, enviarCohetesClasificados } from './modulos/funciones.mjs'
import { verificarExistenciaCohete, clasificarCohetesPorCarga } from './modulos/middlewares.mjs'

// Definir el puerto en el que correrá nuestro servidor
// Se utiliza el 3000 por ser el puerto estándar por convención en el desarrollo con Node.js, ideal para no chocar con puertos reservados del SO.
const PUERTO = 3000

/*
    Instanciar la aplicación de Express.
    El objeto "app" nos permite configurar las rutas y arrancar el servidor.
*/
const app = express()

// Rutas REST clásicas utilizando el método GET
// En la arquitectura REST, GET es el verbo indicado exclusivamente para obtener/leer datos, sin alterar nada en el servidor.
app.get("/api/v1/cohetes", enviarCohetes)

/*
    Ruta con parámetro dinámico (:id).
    Acá se inyecta el middleware "verificarExistenciaCohete" para que se ejecute justo antes del callback final "enviarCohetePorId".
    Esto aplica la separación de responsabilidades ya que detiene peticiones erróneas a tiempo (ej: si no existe el cohete), dejando el callback final limpio y dedicado solo a responder.
*/
app.get("/api/v1/cohetes/:id", verificarExistenciaCohete, enviarCohetePorId)

/*
    Endpoint orientado a procedimientos.
    Es una ruta separada de la API REST clásica, que ejecuta una acción específica (clasificar cohetes por carga).
*/
app.get("/clasificar-cohetes", clasificarCohetesPorCarga, enviarCohetesClasificados)

/*
    Iniciar el servidor para que escuche peticiones en el puerto asignado.
*/
app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`)
})

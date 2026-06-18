/*
    MÓDULO: INDEX
    - Inicia el servidor, recibe las peticiones del usuario y las redirige hacia el middleware y el callback correspondiente.
*/

import express from 'express'
import { enviarCohetes, enviarCohetePorId, enviarCohetesClasificados } from './modulos/funciones.mjs'
import { verificarExistenciaCohete, clasificarCohetesPorCarga } from './modulos/middlewares.mjs'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'

// Definir el puerto en el que correrá nuestro servidor
// Se utiliza el 3000 por ser el puerto estándar por convención en el desarrollo con Node.js, ideal para no chocar con puertos reservados del SO.
const PUERTO = 3000

/*
    Instanciar la aplicación de Express.
    El objeto "app" nos permite configurar las rutas y arrancar el servidor.
*/
const app = express()

// Configuramos cookie-parser con una firma secreta (luego la pasaremos al .env)
app.use(cookieParser("secreto-parcial"))

// Servir la página de login bajo la ruta /login (Pública)
app.use('/login', express.static('front/login'))

// Servir la interfaz web protegida directamente en la raíz (/)
app.use('/', validarCookie, express.static('front/web'))

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




//-----------------------------------------------------------------------------------------------------//
//MIDDLEWARES

function validarCookie(req, res, next) {
    // Obtenemos el token desde la cookie firmada
    const token = req.signedCookies['token'];

    // Verificamos el token usando jwt
    jwt.verify(token, "secreto-parcial", (error, payload) => {
        // Si hay error (no hay token, caducó o es falso), pateamos al login
        if (error) {
            return res.redirect('/login');
        }

        // Si es válido, lo dejamos pasar
        next();
    });
}

//-----------------------------------------------------------------------------------------------------//

/*
    Iniciar el servidor para que escuche peticiones en el puerto asignado.
*/
app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`)
})

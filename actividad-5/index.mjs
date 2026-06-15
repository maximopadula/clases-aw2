import express from 'express'
import cookieParser from 'cookie-parser'

// IMPORTACIONES DE NUESTROS MÓDULOS
import { rutasUsuarios } from './modulos/usuarios/rutas.usuarios.mjs'
import { validarSesion } from './modulos/usuarios/controlador.usuarios.mjs'

const PUERTO = 3000
const servidor = express()

// 1. CONFIGURACIÓN GLOBAL
// Configuramos el lector de cookies
servidor.use(cookieParser('supersecreto'))
// Para RECIBIR datos que envía el frontend hacia tu servidor (backend)
servidor.use(express.json()) // convertimos json a un objeto JS
servidor.use(express.urlencoded({extended: true})) // convertimos urlencoded a un objeto JS

// 2. RUTAS ESTÁTICAS (Frontend)
servidor.use('/login', express.static('./front/login'))
// Protegemos el admin con el middleware
servidor.use('/admin', validarSesion, express.static('./front/admin'))

// 3. RUTAS DE LA API (Módulos)
// Registramos todas las rutas del módulo de usuarios (/registrar, /autenticacion)
servidor.use(rutasUsuarios)

// 4. INICIAR SERVIDOR
servidor.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`)
})

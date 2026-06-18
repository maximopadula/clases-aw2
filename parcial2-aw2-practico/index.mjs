import express from 'express'
import cookieParser from 'cookie-parser'
import 'dotenv/config'

// Importar las rutas modulares de cada dominio
import { rutasUsuarios } from './back/modulos/usuarios/rutas.usuarios.mjs'
import { rutasCohetes } from './back/modulos/cohetes/rutas.cohetes.mjs'
import { validarCookie } from './back/modulos/usuarios/middlewares.usuarios.mjs'

const PUERTO = 3000
const app = express()

// Definir configuraciones globales del servidor
app.use(cookieParser(process.env.FIRMA_SECRETA))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Servir la carpeta de la pagina publica de login
app.use('/login', express.static('front/login'))

// Montar las rutas modulares en la raiz
app.use('/', rutasUsuarios)
app.use('/', rutasCohetes)

// Servir la interfaz web protegida directamente en la raiz (/)
// Requiere validacion de cookie y se coloca al final para evitar interceptar otras rutas de la raiz
app.use('/', validarCookie, express.static('front/web'))

// Iniciar el servidor en el puerto configurado
app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`)
})

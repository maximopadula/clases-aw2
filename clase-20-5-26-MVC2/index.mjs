import express from 'express'
import * as controlador from './modulos/productos/controlador.productos.mjs'
import { rutasProductos } from './modulos/productos/rutas.productos.mjs'

const PUERTO = 3000

const app = express()

app.use(rutasProductos)

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`)
})
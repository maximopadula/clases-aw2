import {Router} from "express"
import * as controlador from "./controlador.productos.mjs"

//Instanciamos router
export const rutasProductos = new Router()

rutasProductos.get("/api/v1/productos", controlador.obtenerTodos)
rutasProductos.get("/api/v1/productos/:id", controlador.obtenerUno)
rutasProductos.delete("/api/v1/productos/:id", controlador.eliminarUno)

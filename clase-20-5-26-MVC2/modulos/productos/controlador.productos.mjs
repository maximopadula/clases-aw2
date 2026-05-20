import * as modelo from "./modelo.productos.mjs"; //modelo es un espacio de nombres. Es un objeto
import * as vista from "./vista.productos.mjs"


export function obtenerTodos(req, res) {
    const productos = modelo.obtenerTodos()
    const respuestaVista = vista.obtenerTodos(productos)
    res.json(respuestaVista)
}

export function obtenerUno(req, res) {
    const idProducto = Number(req.params.id)
    const producto = modelo.obtenerUno(idProducto)

    if(producto.datos.ength > 0) {
        res.json(producto)
    } else {
        res.status(404).json({mensaje: `El producto con el id ${idProducto} no existe.`})
    }
}
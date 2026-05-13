import * as modelo from "./modelo.productos.mjs"; //modelo es un espacio de nombres. Es un objeto

export function obtenerTodos(req, res) {
    const productos = modelo.obtenerTodos()
    res.json(productos)
}

export function obtenerUno(req, res) {
    const idProducto = Number(req.params.id)
    const producto = modelo.obtenerUno(idProducto)

    if(producto.length > 0) {
        res.json(producto)
    } else {
        res.status(404).json({mensaje: `El producto con el id ${idProducto} no existe.`})
    }
}
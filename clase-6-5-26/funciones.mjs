import { productos } from "./productos.mjs"

export function obtenerProductos(req, res) {
    res.json(productos)
}

export function obtenerProducto(req, res) {

    const idProducto = Number(req.params.id)

    const productosFiltrados = productos.filter((producto) => {
        return Number(producto.id) === idProducto 
    })

    if(productosFiltrados.length > 0) {

        res.json(productosFiltrados)

    } else {
        const respuesta = {
            mensaje: `El producto con el id ${idProducto} no se ha encontrado.`
        }
        res.status(404).json(respuesta)
    }
}

export function agregarProducto(req, res) {

    const nuevoProducto = req.body
    productos.push(nuevoProducto)

    const respuesta = {
        mensaje: `Producto agregado`
    }
    res.json(respuesta)
    
}

export function eliminarProducto(req, res) {

    const idProducto = Number(req.params.id)

    const productosFiltrados = productos.filter((producto) => {
        return Number(producto.id) !== idProducto //Pasan todos excepto el que quiero eliminar
    })

    productos.length = 0
    productos.push(...productosFiltrados)

    const respuesta = {
        mensaje: `El producto con el id ${idProducto} fue eliminado.`
    }
    res.json(respuesta)
}




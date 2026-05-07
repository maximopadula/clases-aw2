import { productos } from "./productos.mjs"

export function obtenerProductos(req, res) {
    res.json(productos.datos)
}

export function obtenerProducto(req, res) {

    const idProducto = Number(req.params.id)

    const productosFiltrados = productos.datos.filter((producto) => {
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
    const proximoId = Number(productos.ultimoId) + 1

    nuevoProducto.id = String(proximoId)

    productos.ultimoId = proximoId

    productos.datos.push(nuevoProducto)

    const respuesta = {
        mensaje: `Producto agregado`
    }
    res.json(respuesta)
    
}

export function modificarProducto(req, res) {

    const idProducto = Number(req.params.id)
    const productoAModificar = req.body

    productos.datos.forEach((producto, indice) => {

        // const indice = productos.datos.indexOf(producto)

        if(idProducto === Number(producto.id)) {
            productoAModificar.id = idProducto
            productos.datos[indice] = productoAModificar
        }
    })

    const respuesta = {
        mensaje: `Producto modificado con id ${idProducto}`
    }
    res.json(respuesta)
}

export function eliminarProducto(req, res) {

    const idProducto = Number(req.params.id)

    const productosFiltrados = productos.datos.filter((producto) => {
        return Number(producto.id) !== idProducto //Pasan todos excepto el que quiero eliminar
    })

    productos.datos.length = 0
    productos.datos.push(...productosFiltrados)

    const respuesta = {
        mensaje: `El producto con el id ${idProducto} fue eliminado.`
    }
    res.json(respuesta)
}




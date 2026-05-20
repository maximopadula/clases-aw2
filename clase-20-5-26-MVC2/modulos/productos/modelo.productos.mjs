import { productos } from "../../productos.mjs";

export function obtenerTodos() {
    return productos
}

export function obtenerUno(id) {

    const productoFiltrado = productos.datos.filter((producto) => {
        return Number(producto.id) === id
    })
    return {
        ultimoId: 5,
        datos: productoFiltrado
    }
}

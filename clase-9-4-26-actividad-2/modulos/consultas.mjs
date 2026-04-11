export async function consultarAPI() {

    const respuesta = await fetch("https://api.escuelajs.co/api/v1/users")
    const datos = await respuesta.json()

    const datosFiltrados = datos.map(dato => ({

        id: dato.id,
        name: dato.name,
        email: dato.email

    }))

    return datosFiltrados
}

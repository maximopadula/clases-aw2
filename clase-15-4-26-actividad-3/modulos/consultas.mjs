export async function obtenerDatosAPI() {
    const respuestaAPI = await fetch("https://api.escuelajs.co/api/v1/users");

    // Comprobamos si la API no devolvió un código OK (200-299)
    if (!respuestaAPI.ok) {
        throw new Error(`Error en la API externa: ${respuestaAPI.status}`);
    }

    return await respuestaAPI.json();
}

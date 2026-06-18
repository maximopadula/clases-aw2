/**
 * Modelo de Cohetes
 * Comunicarse con la API del servidor para obtener los datos.
 */

// Realizar peticion HTTP GET para obtener todos los cohetes
export async function obtenerCohetes() {
    const respuesta = await fetch("/api/v1/cohetes");
    if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);
    return await respuesta.json();
}

// Realizar peticion HTTP GET para obtener los detalles de un cohete por su ID
export async function obtenerCohetePorId(id) {
    const respuesta = await fetch(`/api/v1/cohetes/${id}`);
    if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);
    return await respuesta.json();
}

// Realizar peticion HTTP GET para obtener la clasificacion de capacidad de carga de los cohetes
export async function obtenerClasificacionCohetes() {
    const respuesta = await fetch("/clasificar-cohetes");
    if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);
    return await respuesta.json();
}

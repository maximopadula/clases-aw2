document.addEventListener("DOMContentLoaded", async () => {
    try {
        // 1. Atrapar el ID de la Query String en la URL (?id=...)
        const parametrosURL = new URLSearchParams(window.location.search);
        const idCohete = parametrosURL.get("id");

        // Si alguien entra a cohete.html sin ID, lanzamos un error
        if (!idCohete) {
            throw new Error("No se proporcionó un ID de cohete en la URL");
        }

        // 2. Obtenemos los datos (Modelo / Servicio)
        // Le pasamos el ID para que busque solo ese cohete
        const cohete = await obtenerCohete(idCohete);
        
        // 3. Renderizamos en pantalla (Vista)
        renderizarCohete(cohete);
    } catch (error) {
        console.error("Hubo un problema iniciando la página del cohete:", error);
        document.getElementById("titulo-cohete").textContent = "Cohete no encontrado";
    }
});

/**
 * Función encargada únicamente de traer un cohete específico por su ID.
 * (Cumple el rol de "Modelo" o "Servicio")
 */
async function obtenerCohete(id) {
    // Fíjate que al final le agregamos el ID a la URL dinámica
    const respuesta = await fetch(`http://localhost:3000/api/v1/cohetes/${id}`);
    
    if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    return await respuesta.json();
}

/**
 * Función encargada únicamente de pintar los datos del cohete en los <span>.
 * (Cumple el rol de "Vista")
 */
function renderizarCohete(cohete) {
    // En lugar de concatenar HTML, aquí simplemente modificamos el textContent de cada elemento
    document.getElementById("titulo-cohete").textContent = cohete.nombre;
    document.getElementById("dato-operador").textContent = cohete.operador;
    document.getElementById("dato-metros").textContent = cohete.metrosAltura;
    document.getElementById("dato-etapas").textContent = cohete.etapas;
    document.getElementById("dato-toneladas").textContent = cohete.toneladasCarga;
    document.getElementById("dato-reutilizacion").textContent = cohete.reutilizacion;
}
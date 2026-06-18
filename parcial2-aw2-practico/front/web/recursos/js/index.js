document.addEventListener("DOMContentLoaded", async () => {
    try {
        // 1. Obtenemos los datos (Modelo / Servicio)
        const arregloCohetes = await obtenerCohetes();
        
        // 2. Renderizamos en pantalla (Vista)
        renderizarCohetes(arregloCohetes);
    } catch (error) {
        console.error("Hubo un problema iniciando la aplicación:", error);
    }
});

/**
 * Función encargada únicamente de traer los datos desde la API.
 * (Cumple el rol de "Modelo" o "Servicio")
 */
async function obtenerCohetes() {
    const respuesta = await fetch("http://localhost:3000/api/v1/cohetes");
    
    if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    return await respuesta.json();
}

/**
 * Función encargada únicamente de pintar los datos en el DOM.
 * (Cumple el rol de "Vista")
 */
function renderizarCohetes(arregloCohetes) {
    const contenedor = document.getElementById("contenedor-cohetes");
    
    let htmlTarjetas = "";

    arregloCohetes.forEach(cohete => {
        htmlTarjetas += `
            <article>
                <img src="" alt="Imagen de ${cohete.nombre}">
                <div>
                    <h2>${cohete.nombre}</h2>
                    <p>${cohete.operador}</p>
                    <a href="./cohete.html?id=${cohete.id}">Ver detalles</a>
                </div>
            </article>
        `;
    });

    contenedor.innerHTML = htmlTarjetas;
}

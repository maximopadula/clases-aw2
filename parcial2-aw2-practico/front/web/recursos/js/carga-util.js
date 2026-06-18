document.addEventListener("DOMContentLoaded", () => {
    const btnEjecutar = document.getElementById("btn-ejecutar");
    
    // Escuchamos el clic del botón
    btnEjecutar.addEventListener("click", async () => {
        try {
            // Mostramos al usuario que está cargando...
            mostrarEstado("Ejecutando procedimiento en el servidor...");
            
            // 1. Ejecutar procedimiento (Modelo)
            const cohetesClasificados = await ejecutarClasificacion();
            
            // 2. Renderizar los datos devueltos (Vista)
            renderizarTabla(cohetesClasificados);
            
            // 3. Avisar que hubo éxito (Pide la consigna)
            mostrarEstado("¡El procedimiento se ejecutó con éxito!");
        } catch (error) {
            console.error(error);
            // Avisar que hubo un error (Pide la consigna)
            mostrarEstado("Error al ejecutar el procedimiento.");
        }
    });
});

/**
 * Función que hace la petición al endpoint de procedimiento.
 * (Modelo)
 */
async function ejecutarClasificacion() {
    const respuesta = await fetch("http://localhost:3000/clasificar-cohetes");
    
    if (!respuesta.ok) {
        throw new Error(`Error en el procedimiento: ${respuesta.status}`);
    }
    
    return await respuesta.json();
}

/**
 * Función que toma los datos devueltos y arma una tabla HTML.
 * (Vista)
 */
function renderizarTabla(cohetes) {
    const contenedor = document.getElementById("contenedor-resultados");
    
    // Armamos la cabecera de la tabla sin CSS
    let htmlTabla = `
        <table border="1">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Operador</th>
                    <th>Carga Útil</th>
                    <th>Clasificación (Nuevo)</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    // Armamos cada fila iterando sobre los datos
    cohetes.forEach(cohete => {
        htmlTabla += `
            <tr>
                <td>${cohete.nombre}</td>
                <td>${cohete.operador}</td>
                <td>${cohete.toneladasCarga}</td>
                <td>${cohete.clasificacionCarga}</td>
            </tr>
        `;
    });
    
    // Cerramos la tabla
    htmlTabla += `
            </tbody>
        </table>
    `;
    
    // Inyectamos todo en el HTML
    contenedor.innerHTML = htmlTabla;
}

/**
 * Función auxiliar para actualizar el mensaje en pantalla.
 */
function mostrarEstado(mensaje) {
    const pEstado = document.getElementById("mensaje-estado");
    pEstado.textContent = mensaje;
}

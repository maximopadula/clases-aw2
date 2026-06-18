/**
 * Controlador de Cohetes
 * Vincular la logica del modelo con la visualizacion de la vista segun la pagina.
 */

import * as modelo from './modelo.cohetes.js';
import * as vista from './vista.cohetes.js';

// Cargar la lista completa de cohetes y pasarla a la vista para renderizar
export async function iniciarPaginaPrincipal() {
    try {
        const arregloCohetes = await modelo.obtenerCohetes();
        vista.renderizarLista(arregloCohetes);
    } catch (error) {
        console.error("Hubo un problema iniciando la aplicacion:", error);
    }
}

// Extraer el ID de la URL y solicitar los detalles del cohete para mandarlos a la vista
export async function iniciarPaginaDetalle() {
    try {
        const parametrosURL = new URLSearchParams(window.location.search);
        const idCohete = parametrosURL.get("id");

        if (!idCohete) {
            throw new Error("No se proporciono un ID de cohete en la URL");
        }

        const cohete = await modelo.obtenerCohetePorId(idCohete);
        vista.renderizarDetalle(cohete);
    } catch (error) {
        console.error("Hubo un problema iniciando la pagina del cohete:", error);
        vista.mostrarErrorGeneral("titulo-cohete", "Cohete no encontrado o error de conexion");
    }
}

// Registrar el evento del boton para ejecutar el procedimiento de clasificacion
export async function iniciarPaginaClasificacion() {
    const btnClasificar = document.getElementById("btn-ejecutar");
    
    // Escuchar el click en el boton para pedir la clasificacion y mandarla a la vista
    btnClasificar.addEventListener("click", async () => {
        try {
            const arregloCohetes = await modelo.obtenerClasificacionCohetes();
            vista.renderizarClasificacion(arregloCohetes);
        } catch (error) {
            console.error("Fallo la peticion al clasificar cohetes:", error);
            vista.mostrarErrorGeneral("mensaje-estado", "Error ejecutando el procedimiento en el servidor.");
        }
    });
}

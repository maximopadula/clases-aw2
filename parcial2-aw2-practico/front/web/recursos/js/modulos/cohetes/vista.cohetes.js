/**
 * Vista de Cohetes
 * Manipular el DOM e inyectar la representacion de los datos en el HTML.
 */

// Inyectar el listado de cohetes en forma de tarjetas redondeadas en el contenedor principal
export function renderizarLista(arregloCohetes) {
    const contenedor = document.getElementById("contenedor-cohetes");
    let htmlTarjetas = "";

    arregloCohetes.forEach(cohete => {
        htmlTarjetas += `
            <article class="tarjeta-cohete">
                <div class="tarjeta-cohete__contenido">
                    <h2 class="tarjeta-cohete__titulo">${cohete.nombre}</h2>
                    <p class="tarjeta-cohete__operador">Operador: ${cohete.operador}</p>
                    <a class="tarjeta-cohete__enlace" href="./cohete.html?id=${cohete.id}">Ver detalles</a>
                </div>
            </article>
        `;
    });

    contenedor.innerHTML = htmlTarjetas;
}

// Pintar los datos del cohete individual en el DOM de la pagina de detalles
export function renderizarDetalle(cohete) {
    document.getElementById("titulo-cohete").textContent = cohete.nombre;
    document.getElementById("dato-operador").textContent = cohete.operador;
    document.getElementById("dato-metros").textContent = cohete.metrosAltura;
    document.getElementById("dato-etapas").textContent = cohete.etapas;
    document.getElementById("dato-toneladas").textContent = cohete.toneladasCarga;
    document.getElementById("dato-reutilizacion").textContent = cohete.reutilizacion;
}

// Inyectar los resultados de la clasificacion de carga util en la pagina de ranking
export function renderizarClasificacion(arregloCohetes) {
    const contenedorLista = document.getElementById("contenedor-resultados");
    const spanResultado = document.getElementById("mensaje-estado");
    
    // Indicar al usuario que el procedimiento finalizo con exito
    spanResultado.textContent = "¡Procedimiento de clasificación ejecutado con éxito!";
    spanResultado.className = "caja-procedimiento__estado caja-procedimiento__estado--exito";

    let htmlLista = '<ul class="caja-procedimiento__lista">';
    arregloCohetes.forEach(cohete => {
        htmlLista += `
            <li class="caja-procedimiento__item">
                <strong class="caja-procedimiento__item-nombre">${cohete.nombre}</strong> - Clasificación: <span class="caja-procedimiento__item-insignia">${cohete.clasificacionCarga}</span> 
                <span class="caja-procedimiento__item-informacion">(Carga: ${cohete.toneladasCarga}t)</span>
            </li>
        `;
    });
    htmlLista += "</ul>";

    contenedorLista.innerHTML = htmlLista;
}

// Mostrar un mensaje de error general en el elemento del DOM indicado
export function mostrarErrorGeneral(elementoId, mensaje) {
    const elemento = document.getElementById(elementoId);
    if (elemento) {
        elemento.textContent = mensaje;
        elemento.className = "caja-procedimiento__estado caja-procedimiento__estado--error";
    }
}

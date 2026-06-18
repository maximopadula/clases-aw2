/*
    MÓDULO: MIDDLEWARES
    - Contiene las funciones de validación/cálculo previas a los callbacks que envían la respuesta.
*/

import { cohetes } from '../datos.mjs'

export function verificarExistenciaCohete(req, res, next) {
    // Convertir el parámetro de la URL (:id) a número entero
    const idCohete = parseInt(req.params.id)

    // Buscar si existe un cohete con ese ID en el arreglo de cohetes
    const cohete = cohetes.filter((cohete) => {
        return cohete.id === idCohete
    })

    if (cohete.length > 0) {
        // Si existe, guardar el primer (y único) elemento en la petición
        req.coheteEncontrado = cohete[0];

        // Llamar a next() para indicarle a Express que pase esta misma petición (con el dato inyectado) al siguiente callback en la ruta
        next();
    } else {
        // Si no existe, interrumpir la petición y devolver un código de error 404 (No encontrado)
        // Se utiliza el status 404 por ser el código HTTP correcto para indicar que el servidor no pudo encontrar el recurso solicitado.
        res.status(404).json({ mensaje: `No se ha encontrado un cohete con el id ${idCohete}.` })
    }
}

export function clasificarCohetesPorCarga(req, res, next) {
    // Usar .map() para crear un nuevo arreglo sin modificar los datos originales de datos.mjs. Para cada cohete, se agregará la propiedad "clasificacion"
    const cohetesClasificados = cohetes.map(cohete => {

        let clasificacion = "";

        if (cohete.toneladasCarga < 2) {
            clasificacion = "Small-lift";
        } else if (cohete.toneladasCarga <= 20) {
            clasificacion = "Medium-lift";
        } else if (cohete.toneladasCarga <= 50) {
            clasificacion = "Heavy-lift";
        } else {
            clasificacion = "Super Heavy-lift";
        }

        // Agregar la nueva propiedad al objeto
        cohete.clasificacionCarga = clasificacion;
        return cohete;
    });

    // Guardar el nuevo arreglo en la petición (req)
    req.cohetesClasificados = cohetesClasificados;

    // Llamar a next() para que el siguiente callback en la ruta reciba esta petición ya modificada
    next();
}

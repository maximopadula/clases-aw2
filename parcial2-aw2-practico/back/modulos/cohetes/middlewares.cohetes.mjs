import * as modelo from './modelo.cohetes.mjs';

// Verificar si existe el cohete especificado por su ID en los parametros
export function verificarExistenciaCohete(req, res, next) {
    const idCohete = parseInt(req.params.id);
    const cohete = modelo.obtenerUno(idCohete);

    if (cohete.length > 0) {
        // Almacenar el cohete encontrado en el objeto request
        req.coheteEncontrado = cohete[0];
        next();
    } else {
        // Retornar error 404 si el cohete no existe
        res.status(404).json({ mensaje: `No se ha encontrado un cohete con el id ${idCohete}.` });
    }
}

// Clasificar los cohetes segun su capacidad de carga util en toneladas
export function clasificarCohetesPorCarga(req, res, next) {
    const cohetes = modelo.obtenerTodos();
    
    // Clasificar cada cohete en base a su capacidad de carga
    cohetes.forEach(cohete => {
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
        cohete.clasificacionCarga = clasificacion;
    });

    // Adjuntar la lista de cohetes clasificados en el request
    req.cohetesClasificados = cohetes;
    next();
}

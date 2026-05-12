/*
    MÓDULO: MIDDLEWARES
    - ¿Qué es un middleware?: Son funciones "intermedias" que atrapan la petición antes de que llegue al controlador. Tienen acceso a la petición (req), a la respuesta (res) y pueden dejarla pasar usando next().
    - ¿Qué hace este módulo?: Contiene las funciones de validación previas (como verificar si el cohete existe), para que los controladores no tengan que hacer ese trabajo.
*/

import { cohetes } from './datos.mjs'

export function verificarExistenciaCohete(req, res, next) {
    // Convertimos el parámetro de la URL (:id) a número entero
    const idCohete = parseInt(req.params.id)

    // Buscamos si existe un cohete con ese ID en el arreglo de cohetes
    const cohete = cohetes.filter((cohete) => {
        return cohete.id === idCohete
    })

    if (cohete.length > 0) {
        // Si existe, lo guardamos en la petición (req) para que el controlador lo pueda usar
        req.coheteEncontrado = cohete;

        // Llamamos a next() para indicarle a Express que pase a la siguiente función (el controlador)
        next();
    } else {
        // Si no existe, interrumpimos la petición y devolvemos un código de error 404 (No encontrado)
        res.status(404).json({ mensaje: `No se ha encontrado un cohete con el id ${idCohete}.` })
    }
}

export function encontrarCoheteMasAlto(req, res, next) {
    // Inicialización asumiendo que el primer cohete es el más alto.
    let coheteMasAlto = cohetes[0];

    // Recorrido lineal aplicando lógica comparativa de propiedades del objeto.
    cohetes.forEach(cohete => {
        if (cohete.metrosAltura > coheteMasAlto.metrosAltura) {
            coheteMasAlto = cohete;
        }
    });

    // Guardamos el resultado en la petición y pasamos al controlador
    req.coheteMasAlto = coheteMasAlto;
    next();
}

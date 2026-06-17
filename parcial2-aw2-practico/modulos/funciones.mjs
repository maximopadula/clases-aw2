/* 
    MÓDULO: FUNCIONES
    - Contiene los callbacks principales que toman los datos ya validados/calculados y los entregan al cliente (navegador) a través del objeto de respuesta (res.json).
*/

import { cohetes } from '../datos.mjs'

/*
    Callback para la obtención de todos los recursos.
    Retorna una respuesta HTTP 200 (OK) enviando la estructura JSON.
    Se utiliza el status 200 por ser el código estándar para indicar que la petición tuvo éxito.
*/
export function enviarCohetes(req, res) {
    res.status(200).json(cohetes)
}

/*
    Callback final de la petición luego de pasar por la capa de Middleware.
    Envía el recurso previamente inyectado en el objeto "req".
*/
export function enviarCohetePorId(req, res) {
    res.status(200).json(req.coheteEncontrado)
}

/*
    Endpoint orientado a procedimientos (por fuera de la API REST, por no respetar los principios de rutas).
    Devuelve los datos procesados (trabajo realizado por el Middleware) con la nueva clasificación.
*/
export function enviarCohetesClasificados(req, res) {
    res.status(200).json(req.cohetesClasificados);
}

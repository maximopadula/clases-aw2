/* 
    MÓDULO: CONTROLADORES
    - ¿Qué es un controlador?: Es la función que actúa como destino final de una ruta. Su único trabajo es dar la respuesta al cliente.
    - ¿Qué hace este módulo?: Contiene las funciones que agarran los datos ya validados (o calculados) y los entregan al usuario a través del objeto de respuesta (res.json).
*/

import { cohetes } from './datos.mjs'

/*
    Controlador de ruta (Route Handler) para la obtención de recursos.
    Responsable de retornar una respuesta HTTP 200 (OK) enviando la estructura JSON.
*/
export function devolverCohetes(req, res) {
    res.status(200).json(cohetes)
}

/*
    Controlador final de la petición luego de pasar por la capa de Middleware.
    Se limita a enviar el recurso previamente procesado e inyectado en el objeto 'req'.
*/
export function devolverCohetePorId(req, res) {
    res.status(200).json(req.coheteEncontrado)
}

/*
    Endpoint orientado a procedimientos (por fuera de la API REST, por no respetar los principios de rutas).
    Ejecuta un algoritmo procesando los datos de la colección estática.
*/
export function devolverCoheteMasAlto(req, res) {
    // El middleware 'encontrarCoheteMasAlto' ya realizó el algoritmo de búsqueda.
    // Envío del resultado manteniendo el formato de respuesta de la API.
    res.status(200).json(req.coheteMasAlto);
}

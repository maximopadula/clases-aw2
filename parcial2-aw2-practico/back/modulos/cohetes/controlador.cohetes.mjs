import * as modelo from './modelo.cohetes.mjs';
import * as vista from './vista.cohetes.mjs';

// Retornar el listado completo de cohetes procesado por la vista
export function enviarCohetes(req, res) {
    const cohetes = modelo.obtenerTodos();
    res.status(200).json(vista.obtenerTodos(cohetes));
}

// Retornar los detalles del cohete solicitado procesado por la vista
export function enviarCohetePorId(req, res) {
    res.status(200).json(vista.obtenerUno(req.coheteEncontrado));
}

// Retornar el listado de cohetes clasificados en el middleware
export function enviarCohetesClasificados(req, res) {
    res.status(200).json(vista.obtenerTodos(req.cohetesClasificados));
}

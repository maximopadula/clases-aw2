import { cohetes } from '../../../datos.mjs';

// Obtener la lista completa de cohetes de la base de datos simulada en memoria
export function obtenerTodos() {
    return cohetes;
}

// Obtener un cohete especifico filtrado por su ID
export function obtenerUno(id) {
    return cohetes.filter(cohete => cohete.id === id);
}

import pool from '../conexion.mjs';

// Buscar un usuario por su nombre de usuario en la base de datos PostgreSQL
export async function obtenerUsuarioPorNombre(usuario) {
    return await pool.query('SELECT * FROM usuarios WHERE username = $1', [usuario]);
}

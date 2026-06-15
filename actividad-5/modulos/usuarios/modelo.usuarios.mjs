import pool from '../bd/conexion.bd.mjs';

export async function crearUsuario(usuario, hash) {
    const resultado = await pool.query(`
        INSERT INTO usuarios (username, password_hash)
        VALUES ($1, $2)
        RETURNING id, username
    `, [usuario, hash]);
    
    return resultado;
}

export async function obtenerUsuarioPorNombre(usuario) {
    const resultado = await pool.query(
        'SELECT * FROM usuarios WHERE username = $1', 
        [usuario]
    );
    
    return resultado;
}

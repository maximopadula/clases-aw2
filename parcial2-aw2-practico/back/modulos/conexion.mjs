import { Pool } from 'pg'
import 'dotenv/config'

// Crear el pool de conexiones de PostgreSQL cargando las variables de entorno desde el .env
const pool = new Pool({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_BD,
    port: process.env.BD_PORT
})

// Exportar la conexion pool configurada para realizar consultas
export default pool

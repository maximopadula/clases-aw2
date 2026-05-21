// import pg from 'pg'
import { Pool } from 'pg'

export const pool = new Pool({
    host: 'localhost',
    database: 'tienda',
    user: 'root',
    password: 'pass',
    port: 5432
})

import express from 'express';
import pool from './conexion.bd.mjs';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';

const PUERTO = 3000;

////////////////

////////////////
const app = express();
app.use(express.json()) //convertimos texto json a un objeto JS
app.use(express.urlencoded({extended: true})) //convertimos urlencoded a un objeto JS

//Admin CRUD
app.use('/admin', express.static('./front/front-admin'))

//Login
app.use('/login', express.static('./front/front-login'))

//Autenticar
app.post('/autenticar', (req, res) => {

    //ACTIVIDAD 5
    
    //Generar id con NanoId

    /*
    El flujo es el siguiente:
        Registro -> servidor -> login --> Admin
    */

})

//Registrar
app.post('/registrar', async (req, res) => {

    //1 - Capturamos datos
    console.log(req.body)//json y urlencoded se guardan acá
    const {usuario, pass} = req.body //Usuario y pass tienen que tener los mismos nombres de los campos que vinene dentro de body para que el deestructuring funcione

    //2 - Control de datos  
    if(!usuario || !pass) {
        return res.status(400).json({
            mensaje: 'Datos incompletos'
        })
    }

    //3 - Encriptamos clave
    const salt = await bcrypt.genSalt(10); // previene el ataque arcoiris de fuerza bruta
    const hash = await bcrypt.hash(pass, salt);
    console.log(hash)

    //4 - Guardamos en BD (habría que usar try-catch también)
    const resultado = await pool.query(`
        INSERT INTO usuarios
            (username, password_hash)
        VALUES
            ($1, $2)
        RETURNING
            id, username
        `, 
        [
            usuario,
            hash
        ]
    )

    console.log(resultado)

    //5 - Verificamos si se realizó la inserción en la BD
    if(resultado.rowCount > 0) {
        return res.json({
            mensaje: `El usuario ${usuario} se ha registrado con éxito`
        })
    }
    res.status(500).json({
        mensaje: `No se pudo realizar el registro`
    })

})

app.listen(PUERTO, () => {
    console.log(`http://localhost:${PUERTO}`);
});
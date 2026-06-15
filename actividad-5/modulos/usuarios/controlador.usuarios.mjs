import bcryptjs from 'bcryptjs';
import { nanoid } from 'nanoid';
import { crearUsuario, obtenerUsuarioPorNombre } from './modelo.usuarios.mjs';

// ------- REGISTRAR ---------
export async function registrar(req, res) {
    const usuario = req.body.usuario;
    const password = req.body.pass;

    if (!usuario || !password) {
        return res.status(400).json({ mensaje: 'No se ingresaron todos los datos.' });
    }

    try {
        // 3- Encriptar datos (contraseña)
        const salt = await bcryptjs.genSalt(10);
        /*
            El salt (que literalmente significa "sal") es un texto aleatorio que se le "espolvorea" a la contraseña antes de convertirla en Hash.  Imagina que dos usuarios, Juan y María, usan la misma contraseña: "123456". Si solo usamos el Hash, el resultado en la base de datos sería idéntico para ambos. Los hackers tienen listas gigantescas (llamadas Rainbow Tables) con millones de contraseñas comunes ya convertidas en Hash. Si ven un Hash repetido, es fácil adivinarlo.El 10 Es el nivel de "costo" o "dificultad".     
        */
        const hash = await bcryptjs.hash(password, salt);
        /*
            El hash es el resultado de aplicar una fórmula matemática (criptografía) a una contraseña de texto plano para convertirla en un texto ilegible. Es fácil convertir "123456" en ese texto loco, pero es (matemáticamente) imposible tomar ese texto loco y regresarlo a "123456". 
        */

        const resultado = await crearUsuario(usuario, hash);

        if (resultado.rowCount > 0) {
            res.status(201).json(`Se registró el usuario ${usuario} correctamente.`);
        } else {
            res.status(500).json('Hubo un problema al realizar el registro.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Error en el servidor al intentar registrar.');
    }
}

// ------- LOGIN ---------
export async function autenticar(req, res) {
    const usuarioIngresado = req.body.usuario;
    const passwordIngresada = req.body.pass;

    try {
        const resultadoUsuario = await obtenerUsuarioPorNombre(usuarioIngresado);

        if (resultadoUsuario.rowCount === 0) {
            return res.status(401).json('Usuario o contraseña incorrectos'); 
        }

        const usuarioBd = resultadoUsuario.rows[0];
        const passwordCorrecto = await bcryptjs.compare(passwordIngresada, usuarioBd.password_hash);

        if (!passwordCorrecto) {
            return res.status(401).json('Usuario o contraseña incorrectos'); 
        }

        res.cookie('sesionId', nanoid(), {
            signed: true,
            httpOnly: true, 
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 // 1 hora de duración
        });

        res.redirect('/admin');

    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json('Ocurrió un error en el servidor al intentar autenticar.');
    }
}

// MIDDLEWARE DE SEGURIDAD
export function validarSesion(req, res, next) {
    if (req.signedCookies.sesionId) {
        next();
    } else {
        res.redirect('/login');
    }
}

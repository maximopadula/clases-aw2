import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import * as modelo from './modelo.usuarios.mjs';
import * as vista from './vista.usuarios.mjs';

// Autenticar al usuario validando sus credenciales contra la base de datos
export async function autenticar(req, res) {
    const usuarioIngresado = req.body.usuario;
    const passwordIngresada = req.body.password;
    
    // Detectar si la peticion espera una respuesta en formato JSON
    const esJson = req.headers['accept']?.includes('application/json') || req.headers['content-type']?.includes('application/json');

    try {
        // Obtener el registro del usuario por su nombre de usuario
        const resultadoUsuario = await modelo.obtenerUsuarioPorNombre(usuarioIngresado);

        if (resultadoUsuario.rowCount === 0) {
            if (esJson) {
                return res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" });
            }
            return res.redirect('/login');
        }

        const usuarioBd = resultadoUsuario.rows[0];
        
        // Comparar el hash de la contrasena almacenada con la contrasena ingresada
        const passwordCorrecto = await bcryptjs.compare(passwordIngresada, usuarioBd.password_hash);

        if (!passwordCorrecto) {
            if (esJson) {
                return res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" });
            }
            return res.redirect('/login');
        }

        // Definir el payload con los datos de sesion del usuario
        const payload = { usuario: usuarioBd.username };
        
        // Generar el token de acceso firmado con la clave secreta
        jwt.sign(payload, process.env.FIRMA_SECRETA, { expiresIn: '1h' }, (error, token) => {
            if (error) {
                if (esJson) {
                    return res.status(500).json({ mensaje: "Error al generar el token" });
                }
                return res.redirect('/login');
            }

            // Almacenar el token en una cookie firmada y segura
            res.cookie('token', token, {
                signed: true,
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 1000 * 60 * 60
            });

            if (esJson) {
                return res.status(200).json({ mensaje: "Login correcto" });
            }
            return res.redirect('/');
        });

    } catch (error) {
        console.error("Error en el login:", error);
        if (esJson) {
            return res.status(500).json({ mensaje: "Error interno del servidor" });
        }
        res.redirect('/login');
    }
}

// Limpiar la cookie de sesion y redirigir al login
export function cerrarSesion(req, res) {
    res.clearCookie('token');
    res.redirect('/login');
}

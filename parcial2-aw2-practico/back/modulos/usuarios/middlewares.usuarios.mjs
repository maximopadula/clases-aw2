import jwt from 'jsonwebtoken';

// Validar que exista una cookie firmada con un token de sesion valido
export function validarCookie(req, res, next) {
    const token = req.signedCookies['token'];

    // Verificar la firma y vigencia del token de acceso
    jwt.verify(token, process.env.FIRMA_SECRETA, (error, payload) => {
        if (error) {
            // Redirigir al login si el token es invalido o inexistente
            return res.redirect('/login');
        }

        // Dar paso al siguiente middleware o ruta
        next();
    });
}

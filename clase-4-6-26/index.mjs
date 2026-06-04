import express from "express"
import cookieParser from "cookie-parser"

const PUERTO = 3000

const app = express()


app.use(cookieParser('clavesecreta')) //Avisamos a express que use cookieparser

app.use(express.json()) //JSON --> Le avisamos a Express que vamos a recibir JSON
app.use(express.urlencoded({extended: true})) // URLENCODED --> Le avisamos a Express que vamos a recibir URLENCODED (otra forma de recibir datos)


//Middleware para chequear cookie
function chequearCookie(req, res, next) {
    
    const sesionId = req.signedCookies['sesionId'] //verificar que la cookie existe
    
    // Verifico si el valor enviado por el cliente coincide con lo que tenemos en el servidor
    if(sesionId === 'minumerodesesion') {
        return next()
    }
    return res.redirect('/login')
}

//Frontend estático (Client Side Rendering)
//Admin
app.use('/admin', chequearCookie, express.static('./frontend/admin'))
// Login
app.use('/login', express.static('./frontend/login'))


// Ruta que va a gestionar la autenticación. A "/autenticacion" va a entrar EL FORMULARIO. No es que nosotros tenemos que entrar ahí
app.post('/autenticacion', (req, res) => {

    const {usuario, clave} = req.body

    if(usuario != 'admin' || clave != '1234') {
        return res.redirect('/login')
    }

    // Generar cabeceras para las cookies
    res.cookie('sesionId', 'minumerodesesion', { //En minumerodesesion iría un ID con nanoid. Único en cada sesión

        // Cuestiones de seguridad
        signed: true,
        httpOnly: true, 
        sameSite: 'lax',
        secure: true,
        maxAge: 1000 * 10 // 1 hora de duración hasta que expire la sesión (hagas o no hagas algo)
    })
    res.redirect("/admin")
})

app.listen(PUERTO, () => {
    console.log(`http://localhost:${PUERTO}`)
})
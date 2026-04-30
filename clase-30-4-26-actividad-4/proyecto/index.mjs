import express from 'express'

const PUERTO = 3000

const app = express()

async function middleware(req, res, next) {

    //Obtenemos los datos de la API
    const respuesta = await fetch("http://localhost:4321/usuario")

    //Pasamos los datos a un objeto JS
    const datosAPI = await respuesta.json()

    //Obtenemos el código
    const codigoEndpoint = datosAPI.codigo

    //Obtenemos el código del parámetro del URL
    const codigoParametro = parseInt(req.params.codigo)

    //Comparamos códigos
    if(codigoEndpoint === codigoParametro) {
        next()
    }

    //Respuesta de error
    res.status(400).json({mensaje: "El código es incorrecto"})
}

app.get('/:codigo', middleware, (req, res)=>{
    
    res.status(200).json({mensaje: "El código es correcto"})
})

app.listen(PUERTO, () => {
    console.log(`http://localhost:${PUERTO}`)
});
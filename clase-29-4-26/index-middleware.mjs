import express from "express"

const PUERTO = 3000

const servidor = express()

//Middlewares
function middleware1(req, res, next) {
    console.log("middleware 1")
    
    const existeUsuario = true

    if(existeUsuario) {
        console.log("Usuario existe, pasa")
        return next() //<-- seguir la pila de ejecución
    }

    console.log("Usuario no existe, no pasa")
    res.status(403).send("Usuario no registrado")
    
}

function middleware2(req, res, next) {
    console.log("middleware 2")
    next() //<-- seguir la pila de ejecución
}

servidor.get("/", middleware1, middleware2, (req, res) => {
    console.log("Ejecucion de callback final")
    res.send("Hola")
})

servidor.listen(PUERTO, () => {
    console.log(`http://localhost:${PUERTO}`)
})


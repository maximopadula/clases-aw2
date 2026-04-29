import express from "express"

const PUERTO = 3000

const servidor = express()

//Middlewares

function middleware1(req, res, next) {
    console.log("middleware 1")
    next() //<-- seguir la pila de ejecución
       
}

servidor.use("/saludo", middleware1) //Si no ponemos la ruta, por defecto pone la raiz y entra a todas las peticiones.

servidor.get("/", (req, res) => {
    console.log("Ejecucion de callback final")
    res.send("Hola")
})

servidor.get("/saludo", (req, res) => {
    console.log("Ejecucion de callback final")
    res.send("Hola ruta /saludo")
})

servidor.listen(PUERTO, () => {
    console.log(`http://localhost:${PUERTO}`)
})


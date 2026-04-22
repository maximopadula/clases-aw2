import express from "express"

const PUERTO = 3000

const PUERTO2 = 6666

// Instancia servidor express
const servidor = express()

// servidor.get("/", (req, res) => {
//     res.end("Hola con GET")
// })

// servidor.post("/", (req, res) => {
//     res.end("Hola con POST")
// })

// Abrir un puerto
// servidor.listen(PUERTO, () => {
//     console.log(`Servidor corriendo en http://localhost:${PUERTO}`)
// })

servidor.get("/", (req, res) => {
    res.set("content-type", "text/html") //Cabecera
    res.status(200) // Código de estado
    res.end("<h1>Entrá a /secreto</h1>") // Cuerpo (Contenido)
})

servidor.get("/secreto", (req, res) => {
    // res.status(204)
    res.end("Me comi a un trava")
})

servidor.get("/materias", (req, res) => {
    res.set("content-type", "application/json")
    res.status(200)
    res.end(`
        
        {
            "Nombre": "Apliaciones web 2",
            "Semestre": "5to"
        },

        {
            "Nombre": "Análisis de sistemas",
            "Semestre": "5to"
        }            
        
        
        `)
})

servidor.post("/", (req, res) => {
    res.set("content-type", "application/json")
    res.end('{"materia"}:"AW2"')
})


// Abrir un puerto
servidor.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`)
})


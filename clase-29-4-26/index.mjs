import express from "express"
import path from "node:path"

const PUERTO = 3000

const servidor = express()

//Levantamos una web estática
servidor.use(express.static(path.resolve("front")))

servidor.listen(PUERTO, () => {
    console.log(`http://localhost:${PUERTO}`)
})


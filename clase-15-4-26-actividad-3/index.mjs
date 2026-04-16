import http from "node:http"
import fsp from "node:fs/promises"
import path from "node:path"


const servidor = http.createServer( async (peticion, respuesta) => {
    if(peticion.method === "GET") {

        if(peticion.url === "/usuarios") {

           const respuestaAPI = await fetch("https://api.escuelajs.co/api/v1/users")
           const datosAPI = await respuestaAPI.json()
           
           const contenidoJSON = JSON.stringify(datosAPI, null, 4)

            try {
                await fsp.writeFile(path.join("./datos.json"), contenidoJSON)
                // respuesta.statusCode = 201
            } catch(error) {
                // respuesta.statusCode = 500
                return respuesta.end("Error en el servidor")
            }

            return respuesta.end(contenidoJSON)

        }
    }

    //Fallback
    respuesta.statusCode = 404
    respuesta.end("Recurso no encontrado")
})

servidor.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000")
})

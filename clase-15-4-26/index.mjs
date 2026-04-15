// Modulo HTTP
import http from "node:http";
import fsp from "node:fs/promises"
import path from "node:path"

const servidor = http.createServer(async (peticion, respuesta) => { // se va a ejecutar solamente cuando haya una petición o request

    if(peticion.method === "GET") {

        if(peticion.url === "/") {
            respuesta.statusCode = 200
            return respuesta.end("Estas en la raiz") 
        }

        if(peticion.url === "/suma") {
            const resultado = (5 + 3).toString()
            respuesta.statusCode = 200
            return respuesta.end(resultado)
        }

    }
    if(peticion.method === "POST") {

        if(peticion.url === "/procesoformulario") {

            return respuesta.end("Se hizo una petición con POST")
        }

        if(peticion.url === "/guardardatos") {

            const respuestaAPI = await fetch("https://api.escuelajs.co/api/v1/users")
            const datosAPI = await respuestaAPI.text()

            try {
                await fsp.writeFile(path.join("./datosapi.txt"), datosAPI)
                respuesta.statusCode = 201
            } catch(error) {
                respuesta.statusCode = 500
                return respuesta.end("Error en el servidor")
            }

            return respuesta.end("Datos guardados")
        }
    }


    respuesta.statusCode = 404
    respuesta.end("Recurso no encontrado")

     // Esto es lo último que tiene que aparecer y no se puede ejecutar dos veces en la misma petición.

})

//3000 es el puerto
servidor.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000")
})
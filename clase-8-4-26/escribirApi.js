import fsp from "node:fs/promises"
import path from "node:path" //Módulo que optimiza las rutas para otros sistemas operativos

try {
    //Hacemos una petición con fetch. Respuesta será un objeto Response
    const respuesta = await fetch("https://69c566e68a5b6e2dec2c62b5.mockapi.io/api/v1/productos") //Api de mockapi.io
    const productos = await respuesta.json() //El .json transforma el cuerpo (cadenas de texto) a un arreglo de JS. Es un arreglo de objetos.

    //https://jsonplaceholder.typicode.com/todos/1 --> API del profe

    //Creamos la ruta 
    const ruta = path.join("./api.json")

    //Guardar datos en un archivo
    const contenido = JSON.stringify(productos, null, 4) //pasamos el arreglo de JS a formato JSON (texto)
    await fsp.writeFile(ruta, contenido)

    //TAREA: leer el archivo del api.json y mostrarlo en consola
} catch(error) {
    console.log(error)
}
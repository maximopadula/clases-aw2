import { consultarAPI } from "./modulos/consultas.mjs"
import { escribirArchivo, leerArchivo } from "./modulos/archivos.mjs"


try {
    const datosFiltrados = await consultarAPI()
    await escribirArchivo(datosFiltrados)
    await leerArchivo()
} catch (error) {
    console.log(error)
}

import fsp from 'node:fs/promises'; //Usar el módulo fs/promises de File System.
import path from 'node:path'; //Usar el módulo path para construir las rutas.

export async function escribirArchivo(datosFiltrados) {
    const ruta = path.join("./usuarios.json")
    const contenidoJSON = JSON.stringify(datosFiltrados, null, 4)
    await fsp.writeFile(ruta, contenidoJSON)
}

export async function leerArchivo() {  
    const ruta = path.join("./usuarios.json")
    const datosJSON = await fsp.readFile(ruta, 'utf-8')
    const datosJSONConvertidos = JSON.parse(datosJSON)
    console.log(datosJSONConvertidos)
}




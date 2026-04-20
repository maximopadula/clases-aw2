import fsp from "node:fs/promises";
import path from "node:path";

// Es buena práctica definir la ruta centralizada para no repetirla
const rutaArchivo = path.join("./datos.json");

export async function guardarDatos(datosEnCadena) {
    // Guarda información en formato JSON/texto en el disco
    await fsp.writeFile(rutaArchivo, datosEnCadena);
}

export async function leerDatos() {
    // Lee el archivo desde el disco y ya lo convierte a Objeto JS automáticamente
    const datosLeidos = await fsp.readFile(rutaArchivo, 'utf-8');
    return JSON.parse(datosLeidos);
}

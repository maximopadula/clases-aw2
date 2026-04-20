import http from "node:http"
import { obtenerDatosAPI } from "./modulos/consultas.mjs"
import { guardarDatos, leerDatos } from "./modulos/archivos.mjs"


const servidor = http.createServer(async (peticion, respuesta) => {
    if (peticion.method === "GET") {

        if (peticion.url === "/usuarios") {

            try {
                // 1. Obtenemos los datos delegando la responsabilidad al módulo de consultas
                const datosAPI = await obtenerDatosAPI();
                const contenidoJSON = JSON.stringify(datosAPI, null, 4);

                // 2. Guardamos en el disco delegando la responsabilidad al módulo de archivos
                await guardarDatos(contenidoJSON);

                // 3. Mandamos la respuesta
                respuesta.statusCode = 201;
                respuesta.setHeader('Content-Type', 'application/json');
                return respuesta.end(contenidoJSON);

            } catch (error) {
                console.error("Error capturado en ruta /usuarios:", error.message);
                respuesta.statusCode = 500;
                return respuesta.end("Error interno en el servidor al intentar procesar /usuarios");
            }

        }

        if (peticion.url === "/usuarios/filtrados") {
            try {
                // 1. Delegamos la lectura y el formateo a JSON a nuestro módulo de archivos
                const datosConvertidos = await leerDatos();

                // 2. Filtramos los datos
                const usuariosFiltrados = datosConvertidos.filter(usuario => usuario.id <= 10);

                // 3. Devolvemos respuesta exitosa
                respuesta.setHeader('Content-Type', 'application/json');
                respuesta.statusCode = 200;
                return respuesta.end(JSON.stringify(usuariosFiltrados, null, 4));

            } catch (error) {
                // Error ENOENT significa que el archivo datos.json NO existe aún en el disco
                if (error.code === 'ENOENT') {

                    respuesta.statusCode = 404; // 404 (Not Found): Indica que el servidor no puede encontrar el recurso solicitado (el archivo no existe).
                    return respuesta.end("Aviso: Falta archivo datos.json. Por favor ejecute /usuarios primero.");
                }
                // 500 (Internal Server Error): Hubo otro tipo de error grave al intentar leer el recurso en nuestro servidor.
                respuesta.statusCode = 500;
                return respuesta.end("Ocurrio un error interno en el servidor al intentar leer los datos");
            }
        }
    }

    //Fallback
    // 404 (Not Found): El usuario introdujo una URL que no corresponde a ninguna de nuestras rutas configuradas.
    respuesta.statusCode = 404
    respuesta.end("Recurso no encontrado")
})

servidor.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000")
})

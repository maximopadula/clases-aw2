import fsp from 'node:fs/promises'; //Usar el módulo fs/promises de File System.
import path from 'node:path'; //Usar el módulo path para construir las rutas.

try {
    const respuesta = await fetch("https://api.escuelajs.co/api/v1/users")
    const datos = await respuesta.json() 

    const datosFiltrados = datos.map(dato => ({

        id: dato.id,
        nombre: dato.name,
        email: dato.email
     
    }))

    const ruta = path.join("./usuarios.json")
    const contenidoJSON = JSON.stringify(datosFiltrados, null, 4)
    await fsp.writeFile(ruta, contenidoJSON)

    const datosJSON = await fsp.readFile(ruta, 'utf-8');
    const datosJSONConvertidos = JSON.parse(datosJSON);
    console.log(datosJSONConvertidos);

} catch(error) {

    console.log(error)
}

/*
    -ConsultarAPI
    
    -Filtrar datos

    -escribirJSON
    -leerJSON
*/

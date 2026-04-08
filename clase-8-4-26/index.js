// console.log("Hola Mundo");

//Importamos un módulo de node. fsp = file system promises. 
import fsp from "node:fs/promises";

try {
    //Leemos archivo txt
    const contenido = await fsp.readFile("./texto.txt", "utf8")
    //Mostramos el contenido
    console.log(contenido)

} catch (error) {
  console.error(error);
}
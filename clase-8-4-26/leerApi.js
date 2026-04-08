try {
    //Hacemos una petición con fetch. Respuesta será un objeto Response
    const respuesta = await fetch("https://69c566e68a5b6e2dec2c62b5.mockapi.io/api/v1/productos") //Api de mockapi.io
    const productos = await respuesta.json() //El .json transforma el cuerpo (cadenas de texto) a un arreglo de JS. Es un arreglo de objetos.
    console.log(productos)

    //https://jsonplaceholder.typicode.com/todos/1 --> API del profe

    //Guardar datos en un archivo

} catch(error) {

}
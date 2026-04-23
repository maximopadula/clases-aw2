import express from "express"

const PUERTO = 3000

const productos = [
    {
        id: 1,
        nombre: "Camiseta",
        precio: 20000
    },
    {
        id: 2,
        nombre: "Pantalón",
        precio: 30000
    }
]

const servidor = express()

const peticionEnRaiz = (req, res) => {
    res.status(200)
    res.end("Servidor funcionando")
}
//Esto se ejecuta cada vez que haya una petición
servidor.get("/", peticionEnRaiz)



servidor.get("/productos", (req, res) => {
    // res.set("content-type", "application/json")
    // res.end(JSON.stringify(productos))
    res.json(productos) // esto es lo mismo que poner las dos líneas anteriores
})

servidor.get("/productos/:id", (req, res) => {

    const id = parseInt(req.params.id)
    console.log(id)
    const arregloFiltrado = productos.filter((producto) => {
        return producto.id === id
    })
    res.json(arregloFiltrado)
})


servidor.use(express.json()) //Avisar a express que verifique si hay datos del cliente en formato .json. Es para el post esto

servidor.post("/productos", (req, res) =>{
    const producto = req.body
    productos.push(producto)
    res.status(201).json({mensaje: "Producto creado"})
})



servidor.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`)
})



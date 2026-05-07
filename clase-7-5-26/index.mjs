import express from 'express';
import { obtenerProductos, obtenerProducto, eliminarProducto, agregarProducto, modificarProducto } from './funciones.mjs';

const PUERTO = 3000;

const app = express();
app.use(express.json()) // avisar a express que voy a mandar datos tipo JSON por el cuerpo

app.get('/api/v1/productos', obtenerProductos) //Trae todos los productos

app.get('/api/v1/productos/:id', obtenerProducto) //Trae UN solo producto

//POST /api/v1/productos --> Damos de alta un registro
app.post('/api/v1/productos', agregarProducto)

//PUT /api/v1/productos:id --> Modificar un registro
app.put('/api/v1/productos/:id', modificarProducto)

//DELTE /api/v1/productos:id --> Eliminar un registro
app.delete('/api/v1/productos/:id', eliminarProducto)

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
})
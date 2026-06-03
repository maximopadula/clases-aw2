import express from 'express'
//implementar módulo path
import multer from 'multer'
import {nanoid} from 'nanoid'
import {MimeType} from 'mime-type'

const app = express()
const mime = MimeType()

const almacenamiento = multer.diskStorage({
  destination: function (req, file, cb) {

    // ---- Agregar chequeos acá ----

    cb(null, '/archivos')
  },
  filename: function (req, file, cb) {
    //obtengo la extension desde el mime type
    //const extension = mime.extension(file.mimetype)
    // obtengo un UID con nanoid()
    const nombreImagen = nanoid() + '.' + mime.extension(file.mime) //genera un ID único
    cb(null, nombreImagen)
  }
})

const PUERTO = 3000

const subirArchivo = multer({
    storage: almacenamiento
})

const gestionArchivos = subirArchivo.single('imagen') //devuelve una funcion

app.use('/admin', express.static('./front-admin')) //ponemos /admin para mostrar el front ahí

app.use('/archivos', express.static('./archivos')) // hacemos pública la carpeta de archivos

//Ruta y método
app.post('/subir-archivo', (req, res) => {

    gestionArchivos(req, res, (error) => {

        // Si hay error respondemos
        if(error) return res.status(500).json({mensaje: 'Error'})

        //Si no hay error
        console.log(req.file)
        res.json({mensaje: 'ruta de subida de archivos del formulario'})
    })


})

app.listen(PUERTO, () => {
    console.log(`http://localhost:${PUERTO}`)
})
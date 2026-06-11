import jwt from 'jsonwebtoken'


const datosPayload = {
    usuario: 'maxi',
    rol: 0
}

jwt.sign(datosPayload, 'frasesupersecreta', {expiresIn: '1h'}, (error, token) => {
    if(error) return console.log(error)

    console.log(token)
})
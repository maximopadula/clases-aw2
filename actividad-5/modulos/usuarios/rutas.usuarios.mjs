import { Router } from 'express';
import { registrar, autenticar } from './controlador.usuarios.mjs';

export const rutasUsuarios = Router();

// Conectamos las URLs con las funciones del controlador

// En el Frontend (El HTML) POST significa ENVIAR. En el Backend (Tu index.mjs) .post() significa ESCUCHAR/RECIBIR
/*
    En Express (tu backend), cuando escribes servidor.post('/registrar', ...), no estás enviando nada. 
    Lo que estás haciendo es decirle al servidor: "Oye, prepara tus manos, porque el frontend va a lanzar datos usando POST hacia la dirección /registrar. Cuando los lance, recibelos y haz esto".

    Usas servidor.get(), servidor.post(), etc., para definir por dónde vas a escuchar.
    Usas req (request) para leer lo que el cliente te envió (como leer una carta que te llegó).
    Usas res (response) para enviarle tu respuesta final (res.send, res.json, res.redirect).
*/
rutasUsuarios.post('/registrar', registrar);
rutasUsuarios.post('/autenticacion', autenticar);

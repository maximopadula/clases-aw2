import { Router } from 'express';
import * as controlador from './controlador.usuarios.mjs';

// Inicializar el enrutador para el modulo de usuarios
export const rutasUsuarios = new Router();

// Definir rutas para la autenticacion del usuario
rutasUsuarios.post('/api/v1/login', controlador.autenticar);
rutasUsuarios.get('/cerrar-sesion', controlador.cerrarSesion);

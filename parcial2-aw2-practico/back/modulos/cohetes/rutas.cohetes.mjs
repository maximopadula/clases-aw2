import { Router } from 'express';
import * as controlador from './controlador.cohetes.mjs';
import * as middlewares from './middlewares.cohetes.mjs';
import { validarCookie } from '../usuarios/middlewares.usuarios.mjs';

// Inicializar el enrutador para el modulo de cohetes
export const rutasCohetes = new Router();

// Definir las rutas protegidas para la consulta y procedimiento de cohetes
rutasCohetes.get("/api/v1/cohetes", validarCookie, controlador.enviarCohetes);
rutasCohetes.get("/api/v1/cohetes/:id", validarCookie, middlewares.verificarExistenciaCohete, controlador.enviarCohetePorId);
rutasCohetes.get("/clasificar-cohetes", validarCookie, middlewares.clasificarCohetesPorCarga, controlador.enviarCohetesClasificados);

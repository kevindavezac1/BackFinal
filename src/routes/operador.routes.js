import express from 'express';
import { methods as operadorController } from '../controllers/operador.controller';

const router = express.Router();

// Ruta para crear un paciente desde el operador
router.post('/operador/pacientes', operadorController.crearPaciente);

export default router;

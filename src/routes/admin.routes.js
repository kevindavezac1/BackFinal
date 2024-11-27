import express from 'express';
import { methods as adminController } from '../controllers/admin.controller';

const router = express.Router();

// Ruta para crear un paciente
router.post('/admin/pacientes', adminController.crearPaciente);

export default router;

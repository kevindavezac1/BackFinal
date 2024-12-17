import { Router } from "express";
import { methods as gestionEspecialidad } from "../controllers/gestionEspecialidad.controller.js";

const router = Router();

router.get('/gestion-especialidades', gestionEspecialidad.getEspecialidades);
router.post('/gestion-especialidades', gestionEspecialidad.createEspecialidad);
router.put('/gestion-especialidades/:id', gestionEspecialidad.updateEspecialidad);
router.delete('/gestion-especialidades/:id', gestionEspecialidad.deleteEspecialidad);

export default router;

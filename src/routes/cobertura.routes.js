import { Router } from "express";
import { methods as coberturaController } from "../controllers/cobertura.controller.js";

const router = Router();

// Usar métodos desde el objeto `methods`
router.get('/coberturas', coberturaController.getCoberturas);
router.post('/coberturas', coberturaController.createCobertura);
router.put('/coberturas/:id', coberturaController.updateCobertura);
router.delete('/coberturas/:id', coberturaController.deleteCobertura);

export default router;

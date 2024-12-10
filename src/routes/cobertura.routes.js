import { Router } from "express";
import { methods as coberturaController } from "../controllers/cobertura.controller.js";

const router = Router();

router.get('/coberturas', coberturaController.getCoberturas);
router.post('/coberturas', coberturaController.createCobertura);
router.put('/coberturas/:id', coberturaController.updateCobertura);
router.delete('/coberturas/:id', coberturaController.deleteCobertura);
router.get('/coberturas/:id', coberturaController.getCoberturaDelUsuario);

export default router;
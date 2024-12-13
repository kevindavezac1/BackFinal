import { Router } from "express";
import { methods as horarioController } from "./../controllers/horario.controller";

const router = Router();

router.get("/horarios/:id_medico/:fecha", horarioController.obtenerHorariosDisponibles);

export default router;

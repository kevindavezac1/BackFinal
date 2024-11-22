import { login } from "../controllers/login.controller.js"; // Correcto import de login
import { Router } from "express";

const router = Router();

// Ruta para login
router.post("/login", login); // Usando el método login como callback

export default router;

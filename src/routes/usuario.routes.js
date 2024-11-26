import { Router } from 'express';
import { methods as usuarioController } from './../controllers/usuario.controller';

const router = Router();

// Ruta para obtener la lista de usuarios
router.get("/obtenerUsuarios", usuarioController.obtenerUsuarios);


// Otras rutas...
router.get("/obtenerUsuario/:id", usuarioController.obtenerUsuario);
router.post("/crearUsuario", usuarioController.crearUsuario);
router.put("/actualizarUsuario/:id", usuarioController.actualizarUsuario);

export default router;

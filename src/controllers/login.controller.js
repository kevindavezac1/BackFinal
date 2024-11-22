import { getConnection } from "../database/database";
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

// Crear usuario (login)
export const login = async (req, res) => {
    try {
        console.log("Datos recibidos:", req.body); // <-- Log para depurar datos recibidos
        const { usuario, password } = req.body;

        if (!usuario || !password) {
            return res.status(400).json({
                codigo: -1,
                mensaje: "Faltan credenciales"
            });
        }

        const connection = await getConnection();
        const respuesta = await connection.query(
            "SELECT id, nombre, apellido, rol FROM usuario WHERE dni = ? AND password = ?",
            [usuario, password]
        );

        if (respuesta.length > 0) {
            const usuarioEncontrado = respuesta[0];
            const token = jwt.sign(
                {
                    sub: usuarioEncontrado.id,
                    name: usuarioEncontrado.nombre,
                    exp: Math.floor(Date.now() / 1000) + (60 * 60) // Expira en 1 hora
                },
                secret
            );

            console.log('Token generado:', token); // <-- Log para verificar el token generado

            res.json({
                codigo: 200,
                mensaje: "OK",
                payload: usuarioEncontrado,
                jwt: token
            });
        } else {
            res.status(401).json({
                codigo: -1,
                mensaje: "Usuario o contraseña incorrectos"
            });
        }
    } catch (error) {
        res.status(500).json({
            codigo: -2,
            mensaje: "Error interno del servidor",
            error: error.message
        });
    }
};

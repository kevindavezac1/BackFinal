import { getConnection } from "./../database/database";
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

// Iniciar sesión
const login = async (req, res) => {
    try {
        // Desestructurar los datos recibidos en el cuerpo de la solicitud
        const { usuario, password } = req.body;
        
        // Establecer la conexión a la base de datos
        const connection = await getConnection();

        // Realizar la consulta en la base de datos
        const respuesta = await connection.query(
            "SELECT id, nombre, apellido, rol FROM usuario WHERE dni = ? AND password = ?",
            [usuario, password]
        );

        // Verificar si la respuesta contiene datos
        if (respuesta.length > 0) {
            const usuarioEncontrado = respuesta[0];  // Obtener el primer usuario de la respuesta

            // Generar el token JWT
            const token = jwt.sign(
                {
                    sub: usuarioEncontrado.id,     // ID del usuario
                    name: usuarioEncontrado.nombre, // Nombre del usuario
                    rol: usuarioEncontrado.rol,    // Rol del usuario
                    exp: Date.now() + 60 * 30000, // Expiración del token en 1 hora
                },
                secret
            );

            // Devolver la respuesta con los datos del usuario y el token
            res.json({
                codigo: 200,
                mensaje: "OK",
                payload: usuarioEncontrado, // Devolver solo el usuario encontrado
                jwt: token,
            });
        } else {
            // Si no se encuentra el usuario, devolver mensaje de error
            res.json({
                codigo: -1,
                mensaje: "Usuario o contraseña incorrecta",
                payload: [],
            });
        }
    } catch (error) {
        // Manejo de errores
        res.status(500);
        res.send(error.message);
    }
};

// Restablecer contraseña
const resetearPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;
        
        const connection = await getConnection();
        const respuesta = await connection.query(
            "UPDATE usuario SET password = ? WHERE id = ?",
            [password, id]
        );

        if (respuesta.affectedRows == 1) {
            res.json({
                codigo: 200,
                mensaje: "Contraseña restablecida",
                payload: [],
            });
        } else {
            res.json({
                codigo: -1,
                mensaje: "Usuario no encontrado",
                payload: [],
            });
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    login,
    resetearPassword
};

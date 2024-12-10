import { getConnection } from "./../database/database";
const secret = process.env.secret;
const jwt = require("jsonwebtoken");

// Función para verificar el token JWT
function verificarToken(req) {
    const token = req.headers.authorization; // Asumiendo que el token es directamente el valor del encabezado
    if (!token) {
        return { estado: false, error: "Token no proporcionado" };
    }

    try {
        const payload = jwt.verify(token, secret);
        console.log('Payload del token:', payload);
        if (Date.now() > payload.exp) {
            return { estado: false, error: "Token expirado" };
        }
        return { estado: true };
    } catch (error) {
        return { estado: false, error: "Token inválido" };
    }
}

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
    try {
        const resultadoVerificar = verificarToken(req);
        if (resultadoVerificar.estado === false) {
            return res.send({ codigo: -1, mensaje: resultadoVerificar.error });
        }
        
        const connection = await getConnection();
        const response = await connection.query(
            "SELECT u.*, c.nombre AS nombre_cobertura FROM usuario u LEFT JOIN cobertura c ON c.id = u.id_cobertura"
        );
        res.json({ codigo: 200, mensaje: "OK", payload: response });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Obtener un usuario por ID
const obtenerUsuario = async (req, res) => {
    try {
        const resultadoVerificar = verificarToken(req);
        if (resultadoVerificar.estado === false) {
            return res.send({ codigo: -1, mensaje: resultadoVerificar.error });
        }
        
        const { id } = req.params;
        const connection = await getConnection();
        const response = await connection.query(
            "SELECT u.*, c.nombre AS nombre_cobertura FROM usuario u LEFT JOIN cobertura c ON c.id = u.id_cobertura WHERE u.id = ?", 
            id
        );
        
        if (response.length === 1) {
            res.json({ codigo: 200, mensaje: "OK", payload: response });
        } else {
            res.json({ codigo: -1, mensaje: "Usuario no encontrado", payload: [] });
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


const crearUsuario = async (req, res) => {
    try {
        const {
            dni,
            apellido,
            nombre,
            fecha_nacimiento,
            password,
            rol,
            email,
            telefono,
            id_cobertura,
            id_especialidad // Este dato debe venir del request si el rol es "medico"
        } = req.body;

        const usuario = {
            dni,
            apellido,
            nombre,
            fecha_nacimiento,
            password,
            rol,
            email,
            telefono,
            id_cobertura
        };

        const connection = await getConnection();

        const response = await connection.query("INSERT INTO usuario SET ?", usuario);
        const id_usuario = response.insertId;

        
        if (rol === "Medico") {
            const medicoEspecialidad = {
                id_medico: id_usuario,
                id_especialidad
            };

            await connection.query("INSERT INTO medico_especialidad SET ?", medicoEspecialidad);
        }

        res.json({
            codigo: 200,
            mensaje: "Usuario añadido",
            payload: [{ id_usuario }]
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


// Actualizar un usuario
const actualizarUsuario = async (req, res) => {
    try {
        const resultadoVerificar = verificarToken(req);
        if (resultadoVerificar.estado === false) {
            return res.send({ codigo: -1, mensaje: resultadoVerificar.error });
        }

        const { id } = req.params;
        const {
            dni,
            apellido,
            nombre,
            fecha_nacimiento,
            password,
            rol,
            email,
            telefono,
            id_cobertura
        } = req.body;

        const usuario = {
            dni,
            apellido,
            nombre,
            fecha_nacimiento,
            password,
            rol,
            email,
            telefono,
            id_cobertura
        };

        const connection = await getConnection();
        await connection.query("UPDATE usuario SET ? WHERE id = ?", [usuario, id]);
        res.json({ codigo: 200, mensaje: "Usuario modificado", payload: [] });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Exportar los métodos
export const methods = {
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    obtenerUsuario
    
};

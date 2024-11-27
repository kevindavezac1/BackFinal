import { getConnection } from "../database/database.js";

// Crear un nuevo paciente
const crearPaciente = async (req, res) => {
    try {
        const { dni, apellido, nombre, fecha_nacimiento, password, rol, email, telefono, id_cobertura } = req.body;

        // Validación de datos
        if (!dni || !apellido || !nombre || !fecha_nacimiento || !password || !rol || !email || !telefono || !id_cobertura) {
            return res.status(400).json({ codigo: 400, mensaje: "Faltan datos obligatorios." });
        }

        const paciente = { dni, apellido, nombre, fecha_nacimiento, password, rol, email, telefono, id_cobertura };
        const connection = await getConnection();
        const response = await connection.query("INSERT INTO usuario SET ?", paciente);

        res.json({ codigo: 200, mensaje: "Paciente creado", payload: [{ id_usuario: response.insertId }] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ codigo: 500, mensaje: "Error al crear el paciente", error: error.message });
    }
};

export const methods = { crearPaciente };

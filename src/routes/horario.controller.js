import { getConnection } from "../database/database";

const obtenerHorariosDisponibles = async (req, res) => {
    try {
        const { id_medico, fecha } = req.params;
        const connection = await getConnection();

        // Consultar los datos de agenda
        const response = await connection.query(
            "SELECT hora_entrada, hora_salida FROM agenda WHERE id_medico = ? AND fecha = ?",
            [id_medico, fecha]
        );

        if (response.length === 0) {
            return res.json({ codigo: 200, mensaje: "No hay horarios disponibles", payload: [] });
        }

        // Calcular los horarios disponibles en intervalos de 30 minutos
        const horarios = [];
        const { hora_entrada, hora_salida } = response[0];
        let horaActual = new Date(`1970-01-01T${hora_entrada}`);
        const fin = new Date(`1970-01-01T${hora_salida}`);

        while (horaActual < fin) {
            horarios.push(horaActual.toTimeString().substring(0, 5)); // Agrega solo HH:mm
            horaActual.setMinutes(horaActual.getMinutes() + 30); // Avanza en intervalos de 30 min
        }

        res.json({ codigo: 200, mensaje: "OK", payload: horarios });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const methods = {
    obtenerHorariosDisponibles,
};

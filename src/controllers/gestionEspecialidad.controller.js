import { getConnection } from "../database/database.js";

export const getEspecialidades = async (_req, res) => {
  try {
    const connection = await getConnection();
    const especialidades = await connection.query("SELECT id, descripcion FROM especialidad");
    res.json(especialidades);
  } catch (error) {
    console.error("Error al obtener especialidades:", error);
    res.status(500).json({ message: "Error al obtener las especialidades" });
  }
};

export const createEspecialidad = async (req, res) => {
  try {
    const { descripcion } = req.body;
    const connection = await getConnection();
    await connection.query("INSERT INTO especialidad (descripcion) VALUES (?)", [descripcion]);
    res.json({ message: "Especialidad creada correctamente" });
  } catch (error) {
    console.error("Error al crear especialidad:", error);
    res.status(500).json({ message: "Error al crear la especialidad" });
  }
};

export const updateEspecialidad = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion } = req.body;
    const connection = await getConnection();
    await connection.query("UPDATE especialidad SET descripcion = ? WHERE id = ?", [descripcion, id]);
    res.json({ message: "Especialidad actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar especialidad:", error);
    res.status(500).json({ message: "Error al actualizar la especialidad" });
  }
};

export const deleteEspecialidad = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();

    // Verificar si la especialidad está asociada a algún médico
    const medicosAsociados = await connection.query(
      "SELECT * FROM medico_especialidad WHERE id_especialidad = ?",
      [id]
    );

    if (medicosAsociados.length > 0) {
      return res.status(400).json({
        message: "No se puede eliminar la especialidad porque tiene médicos asociados.",
      });
    }

    // Verificar si la especialidad existe
    const especialidad = await connection.query("SELECT * FROM especialidad WHERE id = ?", [id]);
    if (especialidad.length === 0) {
      return res.status(404).json({ message: "Especialidad no encontrada" });
    }

    // Eliminar la especialidad
    const result = await connection.query ("DELETE FROM especialidad WHERE id = ?", [id]);
    if (result.affectedRows > 0) {
      return res.json({ message: "Especialidad eliminada correctamente" });
    } else {
      return res.status(404).json({ message: "No se pudo eliminar la especialidad" });
    }
  } catch (error) {
    console.error("Error al eliminar la especialidad:", error);
    return res.status(500).json({ message: "Error al eliminar la especialidad", error: error.message });
  }
};

export const methods = {
  getEspecialidades,
  createEspecialidad,
  updateEspecialidad,
  deleteEspecialidad,
};

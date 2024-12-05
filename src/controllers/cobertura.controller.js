import { getConnection } from "../database/database";

// Obtener todas las coberturas
export const getCoberturas = async (req, res) => {
  try {
    const connection = await getConnection();
    const coberturas = await connection.query("SELECT id, nombre FROM cobertura");
    res.json(coberturas);
  } catch (error) {
    console.error("Error al obtener coberturas:", error);
    res.status(500).json({ message: "Error al obtener las coberturas" });
  }
};

// Crear una nueva cobertura
export const createCobertura = async (req, res) => {
  try {
    const { nombre } = req.body;
    const connection = await getConnection();
    await connection.query("INSERT INTO cobertura (nombre) VALUES (?)", [nombre]);
    res.json({ message: "Cobertura creada correctamente" });
  } catch (error) {
    console.error("Error al crear cobertura:", error);
    res.status(500).json({ message: "Error al crear la cobertura" });
  }
};

// Actualizar una cobertura existente
export const updateCobertura = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const connection = await getConnection();
    await connection.query("UPDATE cobertura SET nombre = ? WHERE id = ?", [nombre, id]);
    res.json({ message: "Cobertura actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar cobertura:", error);
    res.status(500).json({ message: "Error al actualizar la cobertura" });
  }
};

// Eliminar una cobertura
const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

export const deleteCobertura = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Intentando eliminar cobertura con ID:', id);

    const usuarios = await query("SELECT * FROM usuario WHERE id_cobertura = ?", [id]);
    console.log('Usuarios asociados:', usuarios);

    if (usuarios.length > 0) {
      console.log('Cobertura asociada a usuarios, no se puede eliminar.');
      return res.status(400).json({ message: "No se puede eliminar la cobertura porque está asociada a un usuario." });
    }

    const result = await query("DELETE FROM cobertura WHERE id = ?", [id]);
    console.log('Resultado de eliminación:', result);

    res.json({ message: "Cobertura eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar cobertura:", error);
    res.status(500).json({ message: "Error al eliminar la cobertura", error: error.message });
  }
};

// Exportar como un objeto agrupado
export const methods = {
  getCoberturas,
  createCobertura,
  updateCobertura,
  deleteCobertura,
};
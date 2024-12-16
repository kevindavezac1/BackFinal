import { getConnection } from "./../database/database";

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


export const deleteCobertura = async (req, res) => {
  try {
    const { id } = req.params;

    // Obtener conexión desde `getConnection`
    const connection = await getConnection();

    // Verificar si hay usuarios asociados a esta cobertura
    const usuariosAsociados = await connection.query(
      "SELECT * FROM usuario WHERE id_cobertura = ?",
      [id]
    );

    if (usuariosAsociados.length > 0) {
      return res.status(400).json({
        message: "No se puede eliminar la cobertura porque tiene usuarios asociados.",
      });
    }

    // Verificar si la cobertura existe
    const cobertura = await connection.query("SELECT * FROM cobertura WHERE id = ?", [id]);
    if (cobertura.length === 0) {
      return res.status(404).json({ message: "Cobertura no encontrada" });
    }

    // Eliminar la cobertura
    const result = await connection.query("DELETE FROM cobertura WHERE id = ?", [id]);
    if (result.affectedRows > 0) {
      return res.json({ message: "Cobertura eliminada correctamente" });
    } else {
      return res.status(404).json({ message: "No se pudo eliminar la cobertura" });
    }
  } catch (error) {
    console.error("Error al eliminar la cobertura:", error);
    return res.status(500).json({ message: "Error al eliminar la cobertura", error: error.message });
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


// Obtener la cobertura de un usuario específico
export const getCoberturaDelUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const cobertura = await connection.query(
      "SELECT cobertura.id, cobertura.nombre FROM cobertura " +
      "INNER JOIN usuario ON usuario.id_cobertura = cobertura.id " +
      "WHERE usuario.id = ?",
      [id]
    );

    if (cobertura.length > 0) {
      res.json({
        codigo: 200,
        payload: cobertura[0],
        mensaje: "Cobertura obtenida exitosamente"
      });
    } else {
      res.status(404).json({
        codigo: 404,
        mensaje: "Cobertura no encontrada para el usuario"
      });
    }
  } catch (error) {
    console.error("Error al obtener la cobertura del usuario:", error);
    res.status(500).json({
      codigo: 500,
      mensaje: "Error al obtener la cobertura del usuario"
    });
  }
};



// Exportar como un objeto agrupado
export const methods = {
  getCoberturas,
  createCobertura,
  updateCobertura,
  deleteCobertura,
  getCoberturaDelUsuario
};
import { getConnection } from "../database/database";

// Obtener todas las coberturas

export const getCoberturas = async (req, res) => {
  try {
    const connection = await getConnection(); // Obtén la conexión
    const coberturas = await connection.query("SELECT id, nombre FROM cobertura"); // Realiza la consulta SQL
    res.json(coberturas); // Devuelve las coberturas como JSON
  } catch (error) {
    console.error("Error al obtener coberturas:", error);
    res.status(500).json({ message: "Error al obtener las coberturas" });
  }
};

  const createCobertura = async (req, res) => {
    // Tu código aquí
  };
  
  const updateCobertura = async (req, res) => {
    // Tu código aquí
  };
  
  const deleteCobertura = async (req, res) => {
    // Tu código aquí
  };
  
  // Exportar como un objeto agrupado
  export const methods = {
    getCoberturas,
    createCobertura,
    updateCobertura,
    deleteCobertura,
  };
  
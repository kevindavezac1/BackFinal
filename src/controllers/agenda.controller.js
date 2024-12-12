import { getConnection } from "./../database/database";

const secret = process.env.secret;
const jwt = require ("jsonwebtoken");

const obtenerAgenda = async (req, res) => {
    try{
        const {id_medico } = req.params;
        const resultadoVerificar = verificarToken(req);
        if(resultadoVerificar.estado == false){
            return res.send({codigo: -1, mensaje: resultadoVerificar.error})
        }
        const connection = await getConnection();
        const response = await connection.query("SELECT * from agenda where id_medico = ?",id_medico);
        if(response.length > 0){
            res.json({codigo: 200, mensaje:"OK", payload: response})
        }
        else{
            res.json({codigo: 200, mensaje:"Médico no posee agenda", payload: []})
        }
    }
    catch(error){
            res.status(500);
            res.send(error.message);
    }

    
}

const crearAgenda = async (req, res) => {
    try {
        console.log("Datos recibidos en la solicitud:", req.body);

        const {
            id_medico,
            id_especialidad,
            fecha,
            hora_entrada,
            hora_salida,
        } = req.body;

        console.log("Datos desestructurados:", {
            id_medico,
            id_especialidad,
            fecha,
            hora_entrada,
            hora_salida,
        });

        const registroAgenda = {
            id_medico,
            id_especialidad,
            fecha,
            hora_entrada,
            hora_salida,
        };

        console.log("Datos preparados para inserción:", registroAgenda);

        const resultadoVerificar = verificarToken(req);
        console.log("Resultado de la verificación del token:", resultadoVerificar);

        if (resultadoVerificar.estado == false) {
            console.error("Error en la verificación del token:", resultadoVerificar.error);
            return res.send({ codigo: -1, mensaje: resultadoVerificar.error });
        }

        const connection = await getConnection();
        console.log("Conexión establecida con la base de datos.");

        const response = await connection.query("INSERT INTO agenda SET ?", registroAgenda);
        console.log("Respuesta de la base de datos:", response);

        if (response.affectedRows > 0) {
            console.log("Agenda insertada correctamente con ID:", response.insertId);
            res.json({ codigo: 200, mensaje: "OK", payload: [{ id_agenda: response.insertId }] });
        } else {
            console.error("Error al insertar la agenda.");
            res.json({ codigo: -1, mensaje: "Error insertando agenda", payload: [] });
        }
    } catch (error) {
        console.error("Error en el servidor:", error.message);
        res.status(500);
        res.send(error.message);
    }
};


const modificarAgenda = async (req, res) => {
    let connection;
    try{
        const { id } = req.params
        const {
            id_medico,
            id_especialidad,
            fecha,
            hora_entrada,
            hora_salida,
         } = req.body;
         const registroAgenda = {
            id_medico,
            id_especialidad,
            fecha,
            hora_entrada,
            hora_salida,
         };
        const resultadoVerificar = verificarToken(req);
        if(resultadoVerificar.estado == false){
            return res.send({codigo: -1, mensaje: resultadoVerificar.error})
        }
        connection = await getConnection();
        const responseSelect = await connection.query("SELECT * FROM agenda where id = ?",id);
        console.log(responseSelect)
        if(responseSelect.length === 1){
            console.log("entro")
            const connection = await getConnection();
            const response = await connection.query("UPDATE agenda SET ? where id = ?",[registroAgenda,id]);
            if(response.affectedRows > 0){
                res.json({codigo: 200, mensaje: "Agenda modificada", payload:  []});
            }
            else{
                res.json({codigo: 1, mensaje: "Error modificando agenda", payload:  []});
            }
        }
        else{
            res.json({codigo: -1, mensaje: "No existe agenda con el id proporcionado", payload: []});
        }
        

        // res.json({codigo: 200, mensaje: "OK", payload:  response});
    }
    catch(error){
            res.status(500);
            res.send(error.message);
    }
    



    
}

// const eliminarAgenda = async (req, res) => {
//     try{
//         const { id } = req.params
//         const resultadoVerificar = verificarToken(req);
//         if(resultadoVerificar.estado == false){
//             return res.send({codigo: -1, mensaje: resultadoVerificar.error})
//         }
//         const connection = await getConnection();
//         const response = await connection.query("UPDATE agenda SET ? where id = ?",[registroAgenda,id]);
//         res.json({codigo: 200, mensaje: "OK", payload:  response});
//     }
//     catch(error){
//             res.status(500);
//             res.send(error.message);
//     }



    
// }


function verificarToken(req){
    const token = req.headers.authorization;
    if(!token){
        return {estado: false, error: "Token no proporcionado"}
    }
    try{
        const payload = jwt.verify(token, secret);
        if(Date.now() > payload.exp){
            return {estado: false, error: "Token expirado"}
        }
        return {estado: true};
    }
    catch(error){
        return {estado: false, error: "Token inválido"}
    }  

}



export const methods = {
    obtenerAgenda,
    crearAgenda,
    modificarAgenda
}
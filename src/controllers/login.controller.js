import { getConnection } from "./../database/database";
const jwt = require ("jsonwebtoken");
const secret = process.env.SECRET
//crear usuario
const login = async (req, res) => {
    try{
        const {
            usuario,
            password
        } = req.body
        const connection = await getConnection();
        const respuesta = await connection.query("SELECT id, nombre, apellido, rol  FROM usuario WHERE dni = ? AND password = ?", [usuario, password]);
        console.log(respuesta);
        const token = jwt.sign({
            sub: respuesta[0].id,  // Accede al primer objeto de la respuesta (porque es un array)
            name: respuesta[0].nombre,
            exp: Date.now() + 60 * 30000  // Asegúrate de que el tiempo de expiración esté correcto
        }, secret);
        console.log(token)
        if(respuesta.length > 0){
            console.log("se encontró el usuario");
            res.json({codigo: 200, mensaje: "OK", payload: respuesta[0], jwt: token}); // Asegúrate de enviar el usuario correcto
        } else {
            console.log("usuario no encontrado");
            res.json({codigo: -1, mensaje: "Usuario o contraseña incorrecta", payload: []});
        }
        // res.json ({codigo: 200, mensaje: "Usuario añadido", payload: []});
    }
    catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const resetearPassword = async(req, res) => {
    try{
        const { id } = req.params
        const {
            password
        } = req.body
        const connection = await getConnection();
        const respuesta = await connection.query("UPDATE usuario set password = ? where id = ?", [password, id]);
        if(respuesta.affectedRows == 1){
            res.json({codigo: 200, mensaje:"Contraseña restablecida", payload: []})
        }
        else{
            res.json({codigo: -1, mensaje:"Usuario no encontrado", payload: []})
        }
        console.log(respuesta);
    }
    catch(error){
        res.status(500);
        res.send(error.message);
    }
}


export const methods = {
    login,
    resetearPassword
};
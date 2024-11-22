import { getConnection } from "./../database/database";
const jwt = require ("jsonwebtoken");
const secret = process.env.SECRET
//crear usuario
const login = async (req, res) => {
    try {
        console.log("Datos recibidos:", req.body); // <-- Agregar esto
        const { usuario, password } = req.body;

        if (!usuario || !password) {
            return res.status(400).json({
                codigo: -1,
                mensaje: "Faltan credenciales"
            });
        }

        const connection = await getConnection();
        const respuesta = await connection.query(
            "SELECT id, nombre, apellido, rol FROM usuario WHERE dni = ? AND password = ?",
            [usuario, password]
        );

        if (respuesta.length > 0) {
            const usuarioEncontrado = respuesta[0];
            const token = jwt.sign(
                {
                    sub: usuarioEncontrado.id,
                    name: usuarioEncontrado.nombre,
                    exp: Math.floor(Date.now() / 1000) + (60 * 60)
                },
                secret
            );

            res.json({
                codigo: 200,
                mensaje: "OK",
                payload: usuarioEncontrado,
                jwt: token
            });
        } else {
            res.status(401).json({
                codigo: -1,
                mensaje: "Usuario o contraseña incorrectos"
            });
        }
    } catch (error) {
        res.status(500).json({
            codigo: -2,
            mensaje: "Error interno del servidor",
            error: error.message
        });
    }
};


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
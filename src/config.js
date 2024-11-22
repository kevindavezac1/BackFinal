import { config } from "dotenv";

config(); // Carga las variables de entorno desde .env

export default {
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER || "root",
    password: process.env.PASSWORD || "",
};

import express from "express";
import morgan from "morgan";
import cors from "cors";

// Importa las rutas
import usuarioRoutes from "./routes/usuario.routes";
import loginRoutes from "./routes/login.routes";
import agendaRoutes from "./routes/agenda.routes";
import turnoRoutes from "./routes/turno.routes";
import especialidadRoutes from "./routes/especialidad.routes";

const app = express();

app.use(cors());

// Configuración
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Rutas de la API
app.use("/api", usuarioRoutes);  // Rutas de usuarios
app.use("/api", loginRoutes);    // Ruta de login
app.use("/api", agendaRoutes);
app.use("/api", turnoRoutes);
app.use("/api", especialidadRoutes);

export default app;

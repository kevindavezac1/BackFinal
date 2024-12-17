import express from "express";
import morgan from "morgan";
import cors from "cors";

// Importa las rutas
import usuarioRoutes from "./routes/usuario.routes.js";
import loginRoutes from "./routes/login.routes.js";
import agendaRoutes from "./routes/agenda.routes.js";
import turnoRoutes from "./routes/turno.routes.js";
import especialidadRoutes from "./routes/especialidad.routes.js";
import coberturaRoutes from "./routes/cobertura.routes.js";
import gestionEspecialidad from "./routes/gestionEspecialidad.routes.js";

const app = express();

app.use(cors());

// Configuración
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Rutas de la API
app.use("/api", usuarioRoutes);
app.use("/api", loginRoutes);
app.use("/api", agendaRoutes);
app.use("/api", turnoRoutes);
app.use("/api", especialidadRoutes);
app.use("/api", coberturaRoutes);
app.use("/api", gestionEspecialidad);


export default app;

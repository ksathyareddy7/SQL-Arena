import "./config/env.js";
import { createApp } from "./app.js";

const PORT = process.env.PORT || 3000;
const app = createApp();

app.listen(PORT, () => {
  const mode = String(process.env.SQL_ARENA_DB_MODE || "local").toLowerCase();
  const host =
    mode === "docker" ? process.env.DOCKER_DB_HOST : process.env.DB_HOST;
  const port =
    mode === "docker" ? process.env.DOCKER_DB_PORT : process.env.DB_PORT;
  const dbName =
    mode === "docker" ? process.env.DOCKER_DB_NAME : process.env.DB_NAME;
  const user = mode === "docker" ? process.env.DOCKER_DB_USER : process.env.DB_USER;

  console.log(`Server running on port ${PORT}`);
  console.log(
    `DB mode: ${mode} (user=${user || "postgres"} host=${host || "localhost"} port=${port || (mode === "docker" ? "5433" : "5432")} db=${dbName || "sql_arena"})`,
  );
});


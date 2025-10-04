import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import { config } from "../config/index.js";
import * as schema from "./schema.js";

const migrationClient = postgres(config.db.dbUrl, {
  onnotice: (notice) => {
    if (notice.severity !== "NOTICE") console.log(notice);
  },
});
await migrate(drizzle(migrationClient), config.db.migrationConfig);

const conn = postgres(config.db.dbUrl);
export const db = drizzle(conn, { schema });

import { MigrationConfig } from "drizzle-orm/migrator";

process.loadEnvFile();

type APIConfig = {
  port: string;
};

type DBConfig = {
  dbUrl: string;
  migrationConfig: MigrationConfig;
};

type Config = {
  api: APIConfig;
  db: DBConfig;
};

const migrationConfig: MigrationConfig = {
  migrationsFolder: "./src/db/migrations",
};

const api: APIConfig = {
  port: envOrThrow("PORT"),
};

const db: DBConfig = {
  dbUrl: envOrThrow("DB_URL"),
  migrationConfig: migrationConfig,
};

export const config: Config = {
  api: api,
  db: db,
};

function envOrThrow(key: string | undefined): string {
  if (key && process.env[`${key}`] !== undefined) {
    return process.env[`${key}`] as string;
  } else {
    throw new Error(`Env variable not found: ${key}`);
  }
}

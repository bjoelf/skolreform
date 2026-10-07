import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const projectRoot = process.cwd();
const databasePath = path.resolve(
  projectRoot,
  process.env.DATABASE_PATH || "./data/skolreform.db",
);
const migrationsPath = path.join(projectRoot, "migrations");

fs.mkdirSync(path.dirname(databasePath), { recursive: true });

const database = new Database(databasePath);
database.pragma("journal_mode = WAL");
database.pragma("foreign_keys = ON");
database.pragma("busy_timeout = 5000");
database.exec(`
  CREATE TABLE IF NOT EXISTS schema_migrations (
    version TEXT PRIMARY KEY,
    applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

const appliedVersions = new Set(
  database.prepare("SELECT version FROM schema_migrations").all().map(({ version }) => version),
);
const migrationFiles = fs
  .readdirSync(migrationsPath)
  .filter((fileName) => /^\d+_[a-z0-9_]+\.sql$/.test(fileName))
  .sort();

const applyMigration = database.transaction((fileName, sql) => {
  database.exec(sql);
  database.prepare("INSERT INTO schema_migrations (version) VALUES (?)").run(fileName);
});

let appliedCount = 0;

try {
  for (const fileName of migrationFiles) {
    if (appliedVersions.has(fileName)) continue;
    applyMigration(fileName, fs.readFileSync(path.join(migrationsPath, fileName), "utf8"));
    appliedCount += 1;
    console.log(`Applied ${fileName}`);
  }

  console.log(
    appliedCount === 0
      ? `Database is up to date: ${databasePath}`
      : `Applied ${appliedCount} migration(s): ${databasePath}`,
  );
} finally {
  database.close();
}
import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

let database;

export function getDatabase() {
  if (database) return database;

  const databasePath = path.resolve(/* turbopackIgnore: true */
    process.cwd(),
    process.env.DATABASE_PATH || "./data/skolreform.db",
  );

  fs.mkdirSync(path.dirname(databasePath), { recursive: true });
  database = new Database(databasePath);
  database.pragma("journal_mode = WAL");
  database.pragma("foreign_keys = ON");
  database.pragma("busy_timeout = 5000");

  return database;
}
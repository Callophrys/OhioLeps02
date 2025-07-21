// backend/db.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Use SQLite’s async API
export async function openDb() {
  return open({
    filename: './data.db',
    driver: sqlite3.Database
  });
}

export async function initDb() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT,
      count INTEGER,
      syncedAt DATETIME
    )
  `);
  await db.close();
}

// backend/db.js
import Database from 'better-sqlite3';

const db = new Database('./data.db');

// Run this once at startup
export function initDb() {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT,
      count INTEGER,
      syncedAt DATETIME
    )
  `).run();
}

// Insert a record
export function insertRecord({ text, count }) {
  const stmt = db.prepare(
    'INSERT INTO records (text, count, syncedAt) VALUES (?, ?, ?)'
  );
  stmt.run(text, count, new Date().toISOString());
}

// Optional: get all records
export function getRecords() {
  return db.prepare('SELECT * FROM records').all();
}

// // backend/db.js
// import sqlite3 from 'sqlite3';
// import { open } from 'sqlite';
//
// // Use SQLite’s async API
// export async function openDb() {
//   return open({
//     filename: './data.db',
//     driver: sqlite3.Database
//   });
// }
//
// export async function initDb() {
//   const db = await openDb();
//   await db.exec(`
//     CREATE TABLE IF NOT EXISTS records (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       text TEXT,
//       count INTEGER,
//       syncedAt DATETIME
//     )
//   `);
//   await db.close();
// }

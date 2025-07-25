// api/db.ts
import Database from 'better-sqlite3';
import type { RecordInput, RecordRow } from './interfaces';

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
export function insertRecord({ text, count }: RecordInput) {
  console.log('api:insertRecord', text, count);
  const stmt = db.prepare(
    'INSERT INTO records (text, count, syncedAt) VALUES (?, ?, ?)'
  );
  stmt.run(text, count, new Date().toISOString());
}

// Get all records
export function getRecords(): RecordRow[] {
  return db.prepare('SELECT * FROM records').all() as RecordRow[];
}

// src/lib/db.ts
import type { DBSQLiteValues } from '@capacitor-community/sqlite';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

const sqlite = new SQLiteConnection(CapacitorSQLite);
const dbName = 'observations';

export async function getDb(): Promise<SQLiteDBConnection> {
  const db: SQLiteDBConnection = await sqlite.createConnection(dbName, false, 'no-encryption', 1, true);
  await db.open();
  return db;
}

export async function getDbReadOnly(): Promise<SQLiteDBConnection> {
  const db: SQLiteDBConnection = await sqlite.createConnection(dbName, false, 'no-encryption', 1, false);
  await db.open();
  return db;
}

export async function initDb(): Promise<void> {
  const db: SQLiteDBConnection = await getDb();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT,
      count INTEGER,
      synced BOOLEAN
    );
  `);
  await sqlite.closeConnection(dbName, false);
}

export async function addRecord(text: string, count: number): Promise<void> {
  const db: SQLiteDBConnection = await getDb();
  await db.run(
    'INSERT INTO records (text, count, synced) VALUES (?, ?, ?);',
    [text, count, 0]
  );
  await sqlite.closeConnection(dbName, false);
}

export async function getUnsynced(): Promise<any[]> {
  const db: SQLiteDBConnection = await getDbReadOnly();
  const res: DBSQLiteValues = await db.query('SELECT * FROM records WHERE synced = 0;');
  await sqlite.closeConnection(dbName, true);
  return res.values ?? [];
}

export async function markAsSynced(ids: number[]): Promise<void> {
  const db: SQLiteDBConnection = await getDb();
  const placeholders = ids.map(() => '?').join(',');
  await db.run(
    `UPDATE records SET synced = 1 WHERE id IN (${placeholders});`,
    ids
  );
  await sqlite.closeConnection(dbName, false);
}

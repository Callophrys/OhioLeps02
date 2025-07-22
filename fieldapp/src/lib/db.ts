// src/lib/db.ts
//
import type { ObservationRecord } from '$lib/types';
import type { DBSQLiteValues } from '@capacitor-community/sqlite';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

// for Web-fallback, i.e. web-only where not iOS and not Android
import { Capacitor } from '@capacitor/core';

export const sqliteConnection = new SQLiteConnection(CapacitorSQLite);
const dbName = 'observations';

export async function getDb(): Promise<SQLiteDBConnection> { return await getDbInternal(false); }
export async function getDbReadOnly(): Promise<SQLiteDBConnection> { return await getDbInternal(true); }

export async function initDb(): Promise<void> {
  console.log('initDb()');
  const db: SQLiteDBConnection = await getDb();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT,
      count INTEGER,
      synced BOOLEAN
    );
  `);
  await sqliteConnection.closeConnection(dbName, false);
}

export async function addRecord(text: string, count: number): Promise<void> {
  console.log('addRecord');

  const db: SQLiteDBConnection = await getDb();
  console.log('[setupWebDb] jeep element:', document.querySelector('jeep-sqlite'));
  await db.run(
    'INSERT INTO records (text, count, synced) VALUES (?, ?, ?);',
    [text, count, 0]
  );
  console.log('addRecord - db run');
  await sqliteConnection.closeConnection(dbName, false);
  console.log('addRecord - close connection');
}

export async function getAll(): Promise<ObservationRecord[]> {
  const db: SQLiteDBConnection = await getDbReadOnly();
  const res = await db.query('SELECT * FROM records;');
  await sqliteConnection.closeConnection(dbName, true);
  return res.values ?? [];
}

export async function deleteRecord(id: number): Promise<void> {
  const db: SQLiteDBConnection = await getDb();
  await db.run('DELETE FROM records WHERE id = ?', [id]);
  await sqliteConnection.closeConnection(dbName, false);
}

export async function updateRecord(id: number, newText: string): Promise<void> {
  const db: SQLiteDBConnection = await getDb();
  await db.run('UPDATE records SET text = ? WHERE id = ?', [newText, id]);
  await sqliteConnection.closeConnection(dbName, false);
}

export async function getUnsynced(): Promise<ObservationRecord[]> {
  const db: SQLiteDBConnection = await getDbReadOnly();
  const res: DBSQLiteValues = await db.query('SELECT * FROM records WHERE synced = 0;');
  await sqliteConnection.closeConnection(dbName, true);
  return res.values ?? [];
}

export async function markAsSynced(ids: number[]): Promise<void> {
  const db: SQLiteDBConnection = await getDb();
  const placeholders = ids.map(() => '?').join(',');
  await db.run(
    `UPDATE records SET synced = 1 WHERE id IN (${placeholders});`,
    ids
  );
  await sqliteConnection.closeConnection(dbName, false);
}

async function getDbInternal(readOnly: boolean): Promise<SQLiteDBConnection> {
  console.log(`getDb() ${readOnly ? "Read-Only" : "Read-Write"}`);

  const platform = Capacitor.getPlatform();
  if (platform === 'web') {
    await setupWebDb();
  }
  console.log('getDb() setupWebDb done');

  // Get rid of stale connections before creating one.
  await sqliteConnection.checkConnectionsConsistency();
  const isConn = (await sqliteConnection.isConnection(dbName, readOnly)).result;
  if (isConn) {
    await sqliteConnection.closeConnection(dbName, readOnly);
  }

  const db = await sqliteConnection.createConnection(
    dbName,
    false,
    'no-encryption',
    1,
    readOnly
  );
  console.log('getDb() connection created');

  try {
    console.log('getDb() trying to open...');
    await db.open();
    console.log('getDb() open');
  } catch (err) {
    console.error('DB open error:', err);
  }

  return db;
}

/**
 * Safe setup: ensure jeep-sqlite element is defined AND mounted,
 * then init the web store.
 */
async function setupWebDb() {
  const platform = Capacitor.getPlatform();
  if (platform !== 'web') return; // Native? Skip

  // 1️⃣ Register the custom element if not yet defined
  if (!customElements.get('jeep-sqlite')) {
    console.log('[setupWebDb] Defining jeep-sqlite custom element...');
    const jeep: any = await import('jeep-sqlite');
    customElements.define('jeep-sqlite', jeep.defineCustomElement());
  }

  // 2️⃣ Ensure <jeep-sqlite> is actually in the DOM
  let jeepElement: any = document.querySelector('jeep-sqlite');
  if (!jeepElement) {
    console.log('[setupWebDb] <jeep-sqlite> not found — creating...');
    jeepElement = document.createElement('jeep-sqlite');
    document.body.appendChild(jeepElement);
  }

  // Explicit folder path.
  (jeepElement as any).wasmPath = 'assets';

  // 3️⃣ ✅ Wait for the jeep-sqlite to be truly ready
  await new Promise<void>((resolve) => {
    if (jeepElement.isReady) {
      console.log('[setupWebDb] jeep-sqlite is already ready.');
      resolve();
    } else {
      console.log('[setupWebDb] Waiting for jeepSqliteReady event...');
      jeepElement.addEventListener('jeepSqliteReady', () => {
        console.log('[setupWebDb] jeepSqliteReady event fired!');
        resolve();
      });
    }
  });

  // 4 Initialize the Web store
  console.log('[setupWebDb] Initializing web store...');
  // await sqliteConnection.initWebStore();
  await sqliteConnection.initWebStore();

  console.log('[setupWebDb] Web store ready.');
}

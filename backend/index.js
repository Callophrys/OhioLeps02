// backend/index.js
import express from 'express';
import { openDb, initDb } from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

await initDb();

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.post('/api/sync', async (req, res) => {
  const { records } = req.body;
  if (!records || !Array.isArray(records)) {
    return res.status(400).json({ message: 'Missing records array' });
  }

  const db = await openDb();
  const stmt = await db.prepare('INSERT INTO records (text, count, syncedAt) VALUES (?, ?, ?)');

  const now = new Date().toISOString();
  for (const r of records) {
    await stmt.run(r.text, r.count, now);
  }

  await stmt.finalize();
  await db.close();

  res.json({ status: 'ok', saved: records.length });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

import express from 'express';
import { initDb, insertRecord, getRecords } from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

initDb();

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.post('/api/sync', (req, res) => {
  const { records } = req.body;
  if (!records || !Array.isArray(records)) {
    return res.status(400).json({ message: 'Missing records array' });
  }

  records.forEach(r => {
    insertRecord(r);
  });

  res.json({ status: 'ok', saved: records.length });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

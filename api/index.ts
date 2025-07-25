// api/routes/upload.ts
//

import cors from 'cors';
import express from 'express';
import { initDb, getRecords } from './db.ts';
import sync from './routers/sync.ts';
import upload from './routers/uploads.ts';
import type { RecordRow } from './interfaces';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json({ limit: '10mb' }));
// TODO: setup credentials-auth
app.use(cors({
  origin: 'http://localhost:5173', // 👈 your SvelteKit dev server
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // credentials: true // if you send cookies / auth headers
}));

initDb();

app.get('/', (req, res) => {
  const recs: RecordRow[] = getRecords();
  console.log('api:recs', recs);
  res.send('Backend is running!<br>' + recs);
});

app.use('/api/sync', sync);
app.use('/api/upload', upload);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

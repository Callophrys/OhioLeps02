// api/routes/upload.ts
//

import cors from 'cors';
import express from 'express';
import { initDb } from './db.ts';
import sync from './routers/sync.ts';
import upload from './routers/uploads.ts';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors({
  origin: 'http://localhost:5173', // 👈 your SvelteKit dev server
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // credentials: true // if you send cookies / auth headers
}));

initDb();

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.use('/api/sync', sync);
app.use('/api/upload', upload);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

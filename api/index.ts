import express from 'express';
import { initDb } from './db.ts';
import sync from './routes/sync.ts';
import upload from './routes/upload.ts';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

initDb();

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.use('/api/sync', sync);
app.use('/api/upload', upload);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

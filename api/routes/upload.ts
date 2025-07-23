// api/routes/upload.ts
//

import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

interface UploadRequest {
  filename: string;
  data: string; // base64
}

router.post('/', (req, res) => {
  const { filename, data }: UploadRequest = req.body;

  if (!filename || !data) {
    return res.status(400).json({ message: 'Missing filename or data' });
  }

  const uploadsDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const buffer = Buffer.from(data, 'base64');
  const filePath = path.join(uploadsDir, filename);
  fs.writeFileSync(filePath, buffer);

  res.json({ status: 'ok', saved: filename });
});

export default router;

import { Router } from 'express';
import multer from 'multer';
import type { StorageEngine } from 'multer';
import path from 'path';

const router = Router();

const uploadsDir = path.join(process.cwd(), 'uploads');
const storage: StorageEngine = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    console.log('StorageEngine options file:', file);
    cb(null, file.originalname); // or make unique
  },
});

const upload = multer({ storage });

router.post('/', upload.single('file'), (req, res) => {
  const file = req.file;
  const { userid, subject, fileName, timestamp, timeseconds } = req.body;

  console.log('File info:', file);
  console.log('Metadata:', { userid, subject, fileName, timestamp, timeseconds }); // { userid, subject, timestamp });

  res.json({
    status: 'ok',
    saved: req.file?.filename,
    metadata: { userid, subject, timestamp },
  });
});

export default router;


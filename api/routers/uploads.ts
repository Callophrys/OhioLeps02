import { Router } from 'express';
import multer from 'multer';
import path from 'path';

const router = Router();

const uploadsDir = path.join(process.cwd(), 'uploads');
const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname); // or make unique
  },
});

const upload = multer({ storage });

router.post('/', upload.single('file'), (req, res) => {
  res.json({
    status: 'ok',
    saved: req.file?.filename,
  });
});

export default router;


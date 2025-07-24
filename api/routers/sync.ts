// api/routes/sync.ts
//

import { Router } from 'express';
import { insertRecord } from '../db.ts';
import type { RecordInput } from '../interfaces';

const router = Router();

router.post('/', (req, res) => {
  console.log("syncing...");
  const { records } = req.body;

  if (!records || !Array.isArray(records)) {
    return res.status(400).json({ message: 'Missing records array' });
  }

  records.forEach((r: RecordInput) => {
    insertRecord(r);
  });

  res.json({ status: 'ok', saved: records.length });
});

export default router;

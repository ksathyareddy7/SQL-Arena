import express from 'express';
import { executeQuery, explainQuery, submitAnswer } from '../controllers/query.js';

const router = express.Router();

router.post('/execute', executeQuery);
router.post('/explain', explainQuery);
router.post('/submit', submitAnswer);

export default router;

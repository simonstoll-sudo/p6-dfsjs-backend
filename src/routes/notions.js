import express from 'express';
import * as notionController from '../controllers/notionController.js';
import { validateNotion } from '../middleware/validation.js';

const router = express.Router();

router.post('/', validateNotion, notionController.createNotion);
router.get('/', notionController.listNotions);

export default router;

import express from 'express';
import * as workshopController from '../controllers/workshopController.js';
import { validateWorkshop } from '../middleware/validation.js';

const router = express.Router();

router.post('/', validateWorkshop, workshopController.createWorkshop);
router.get('/', workshopController.listWorkshops);
router.get('/:id', workshopController.getWorkshop);

export default router;

import express from 'express';
import { saveResume, getResumes } from '../controllers/resumeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, saveResume).get(protect, getResumes);

export default router;


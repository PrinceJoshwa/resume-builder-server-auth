// import express from 'express';
// import { saveResume, getResumes } from '../controllers/resumeController.js';
// import { protect } from '../middleware/authMiddleware.js';

// const router = express.Router();

// router.route('/').post(protect, saveResume).get(protect, getResumes);

// export default router;

//23-11-24
import express from 'express';
import { createResume, getResumes, getResumeById } from '../controllers/resumeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createResume)
  .get(protect, getResumes);

router.route('/:id')
  .get(protect, getResumeById);

export default router;
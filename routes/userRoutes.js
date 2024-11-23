//23-11-2024
import express from 'express';
import { googleAuth } from '../controllers/userController.js';

const router = express.Router();

router.post('/google', googleAuth);

export default router;
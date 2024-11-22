import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import resumeRoutes from './routes/resumeRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || 'https://resume-builder-client-auth.vercel.app',
    credentials: true,
  }));
  app.use(express.json());

app.use('/api/resumes', resumeRoutes);

// Vercel specific: Use a top-level await for database connection
(async () => {
  try {
    await connectDB();
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
})();

// Vercel uses serverless functions, so we don't need to specify a port
export default app;


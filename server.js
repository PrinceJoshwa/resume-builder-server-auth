// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import connectDB from './config/db.js';
// import resumeRoutes from './routes/resumeRoutes.js';

// dotenv.config();

// const app = express();

// app.use(cors({
//     origin: process.env.CLIENT_URL || 'https://resume-builder-client-auth.vercel.app',
//     credentials: true,
//   }));
//   app.use(express.json());

// app.use('/api/resumes', resumeRoutes);

// // Vercel specific: Use a top-level await for database connection
// (async () => {
//   try {
//     await connectDB();
//     console.log('MongoDB connected successfully');
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//   }
// })();

// // Vercel uses serverless functions, so we don't need to specify a port
// export default app;

//23-11-24

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';

dotenv.config();

connectDB();

const app = express();

// CORS configuration
app.use(cors({
  origin: [
    'https://resume-builder-client-auth.vercel.app',
    'http://localhost:5173', // For local development
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/users', userRoutes);
app.use('/api/resumes', resumeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
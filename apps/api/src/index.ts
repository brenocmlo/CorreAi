import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import leadsRoutes from './routes/leads.routes';
import propertiesRoutes from './routes/properties.routes';
import chatRoutes from './routes/chat.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Initialize Prisma
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/properties', propertiesRoutes);
app.use('/api/chat', chatRoutes);

// Basic Route
app.get('/health', async (req, res) => {
  try {
    // Check DB Connections
    await prisma.$queryRaw`SELECT 1`;
    const mongoState = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    
    res.json({
      status: 'OK',
      postgres: 'Connected',
      mongodb: mongoState,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ status: 'Error', message: 'Database connection failed' });
  }
});

// Connect to MongoDB and start server
async function bootstrap() {
  try {
    if (process.env.MONGODB_URL) {
      await mongoose.connect(process.env.MONGODB_URL);
      console.log('📦 Connected to MongoDB');
    }

    app.listen(port, () => {
      console.log(`🚀 API Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();

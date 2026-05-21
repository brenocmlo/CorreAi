import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import leadsRoutes from './routes/leads.routes.js';
import propertiesRoutes from './routes/properties.routes.js';
import chatRoutes from './routes/chat.routes.js';
import brokersRoutes from './routes/brokers.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/properties', propertiesRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/brokers', brokersRoutes);

app.get('/health', async (_req, res) => {
  try {
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

async function bootstrap() {
  try {
    if (process.env.MONGODB_URL) {
      await mongoose.connect(process.env.MONGODB_URL);
      console.log('📦 Connected to MongoDB');
    }

    if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
      app.listen(port, () => {
        console.log(`🚀 API Server running on http://localhost:${port}`);
      });
    }
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();

export default app;

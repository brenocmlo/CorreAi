import { Router } from 'express';
import { ChatController } from '../controllers/chat.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

// Webhook endpoint (might need to be public for WhatsApp, but we keep it simple for now)
router.post('/webhook', ChatController.receiveMessage);

// Protected route to get history
router.get('/history/:leadId', authenticateToken, ChatController.getHistory);

export default router;

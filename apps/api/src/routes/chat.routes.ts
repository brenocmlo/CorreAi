import { Router } from 'express';
import { ChatController } from '../controllers/chat.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/webhook', ChatController.receiveMessage);
router.get('/history/:leadId', authenticateToken, ChatController.getHistory);

export default router;

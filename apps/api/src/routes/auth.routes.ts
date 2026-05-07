import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { authenticateToken, type AuthRequest } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

router.get('/me', authenticateToken, (req: AuthRequest, res) => {
  res.json({ success: true, user: req.user });
});

export default router;

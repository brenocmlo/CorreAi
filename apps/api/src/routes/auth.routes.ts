import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticateToken, AuthRequest } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Test protected route
router.get('/me', authenticateToken, (req: AuthRequest, res) => {
  res.json({ success: true, user: req.user });
});

export default router;

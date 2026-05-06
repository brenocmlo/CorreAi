import { Router } from 'express';
import { LeadsController } from '../controllers/leads.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

// Protect all lead routes
router.use(authenticateToken);

router.get('/', LeadsController.getLeads);
router.post('/', LeadsController.createLead);

export default router;

import { Router } from 'express';
import { LeadsController } from '../controllers/leads.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/public', LeadsController.createPublicLead);

router.use(authenticateToken);

router.get('/', LeadsController.getLeads);
router.post('/', LeadsController.createLead);
router.put('/:id', LeadsController.updateLead);
router.delete('/:id', LeadsController.deleteLead);

export default router;

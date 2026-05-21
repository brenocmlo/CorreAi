import { Router } from 'express';
import { BrokersController } from '../controllers/brokers.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Apply auth middleware to protect all broker CRUD routes
router.use(authenticateToken);

router.get('/', BrokersController.getBrokers);
router.get('/:id', BrokersController.getBrokerById);
router.post('/', BrokersController.createBroker);
router.put('/:id', BrokersController.updateBroker);
router.delete('/:id', BrokersController.deleteBroker);

export default router;

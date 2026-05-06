import { Router } from 'express';
import { PropertiesController } from '../controllers/properties.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

// Protect all property routes
router.use(authenticateToken);

router.get('/', PropertiesController.getProperties);
router.post('/', PropertiesController.createProperty);

export default router;

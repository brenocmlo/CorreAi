import { Router } from 'express';
import { PropertiesController } from '../controllers/properties.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/public', PropertiesController.getPublicProperties);

router.use(authenticateToken);

router.get('/', PropertiesController.getProperties);
router.post('/', PropertiesController.createProperty);

export default router;

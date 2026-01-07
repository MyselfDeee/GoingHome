import { Router } from 'express';
import { authController } from '../controllers/auth';
import { isAuthenticated } from '../middlewares/auth';

const router = Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Protected route - verify user is authenticated
router.get('/me', isAuthenticated, authController.getCurrentUser);

export default router;

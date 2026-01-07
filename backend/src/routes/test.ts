import { Router } from 'express';
import { authService } from '../services/auth';

const router = Router();

// Only available in development
if (process.env.NODE_ENV === 'development') {
  router.post('/test-user', async (_req, res) => {
    try {
      // Create a test user for development
      const result = await authService.signup({
        fullName: 'Test User',
        email: 'test@example.com',
        password: 'TestPassword123!',
      });

      return res.json({
        message: 'Test user created',
        credentials: {
          email: 'test@example.com',
          password: 'TestPassword123!',
        },
        user: result.user,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create test user';
      return res.status(400).json({ error: message });
    }
  });
}

export default router;

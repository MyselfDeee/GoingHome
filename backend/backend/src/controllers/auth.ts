import { Response } from 'express';
import { authService } from '../services/auth';
import { SignupRequest, LoginRequest } from '../types/auth';
import { AuthRequest } from '../middlewares/auth';

export const authController = {
  async signup(req: any, res: Response) {
    try {
      const { fullName, email, password } = req.body as SignupRequest;

      if (!fullName || !email || !password) {
        return res.status(400).json({ error: 'Full name, email, and password are required.' });
      }

      const result = await authService.signup({ fullName, email, password });
      return res.json(result);
    } catch (err) {
      console.error('Signup error:', err);
      const message = err instanceof Error ? err.message : 'Signup failed.';
      return res.status(400).json({ error: message });
    }
  },

  async login(req: any, res: Response) {
    try {
      const { email, password } = req.body as LoginRequest;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
      }

      const result = await authService.login({ email, password });
      return res.status(200).json(result);
    } catch (err) {
      console.error('Login error:', err);
      const message = err instanceof Error ? err.message : 'Login failed.';
      return res.status(401).json({ error: message });
    }
  },

  async getCurrentUser(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated.' });
      }

      const user = await authService.getUserById(req.user.id);
      return res.json({ user });
    } catch (err) {
      console.error('Get user error:', err);
      const message = err instanceof Error ? err.message : 'Failed to fetch user.';
      return res.status(400).json({ error: message });
    }
  }
};

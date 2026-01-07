import { BACKEND_URL } from './config';

interface User {
  id: string;
  email: string;
  full_name: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface SignupResponse {
  user: User;
}

// Add timeout to fetch requests
const fetchWithTimeout = (url: string, options: RequestInit, timeout = 60000) => {
  console.log(`[Network] Starting request to ${url}`);
  console.log(`[Network] Using timeout: ${timeout}ms`);
  
  return Promise.race([
    fetch(url, options)
      .then(res => {
        console.log(`[Network] ✓ Response received from ${url}: ${res.status}`);
        return res;
      })
      .catch(err => {
        console.error(`[Network] ✗ Fetch error: ${err.message}`);
        throw err;
      }),
    new Promise<Response>((_, reject) =>
      setTimeout(() => {
        console.error(`[Network] ✗ Request timeout after ${timeout}ms to ${url}`);
        reject(new Error(`Request timeout (${timeout}ms) - Backend may be unavailable`));
      }, timeout)
    ),
  ]);
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
};

export const authService = {
  /**
   * Test if backend is reachable
   */
  async healthCheck(): Promise<boolean> {
    try {
      console.log(`[Health] Checking backend health...`);
      const response = await fetchWithTimeout(`${BACKEND_URL}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }, 5000);
      const data = await response.json();
      console.log(`[Health] ✓ Backend is healthy:`, data);
      return true;
    } catch (error) {
      console.error(`[Health] ✗ Backend health check failed:`, error);
      return false;
    }
  },

  /**
   * Sign up a new user
   */
  async signup(fullName: string, email: string, password: string): Promise<SignupResponse> {
    try {
      const response = await fetchWithTimeout(`${BACKEND_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, password }),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  /**
   * Log in a user with email and password
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      console.log(`[Auth] Starting login for ${email}...`);
      console.log(`[Auth] Backend URL: ${BACKEND_URL}`);
      
      // Check health first
      const isHealthy = await this.healthCheck();
      if (!isHealthy) {
        throw new Error('Backend server is unreachable. Please check your network connection.');
      }
      
      const response = await fetchWithTimeout(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(`[Auth] Login successful for ${email}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Get current user info (requires valid token)
   */
  async getCurrentUser(token: string): Promise<{ user: User }> {
    try {
      const response = await fetchWithTimeout(`${BACKEND_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  /**
   * Verify if a token is valid
   */
  async verifyToken(token: string): Promise<boolean> {
    try {
      await this.getCurrentUser(token);
      return true;
    } catch (error) {
      console.error('Token verification failed:', error);
      return false;
    }
  },
};

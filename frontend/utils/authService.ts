// Configure your backend URL here
const BACKEND_URL = 'http://localhost:4000'; // Change this to your actual backend URL

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

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
};

export const authService = {
  /**
   * Sign up a new user
   */
  async signup(fullName: string, email: string, password: string): Promise<SignupResponse> {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/signup`, {
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
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
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
      const response = await fetch(`${BACKEND_URL}/auth/me`, {
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

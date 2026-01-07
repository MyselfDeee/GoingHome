import { BACKEND_URL } from './config';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  relationship?: string;
  idNumber?: string;
  feePerson?: string;
  selectedPlan?: string;
  bankName?: string;
  accountNumber?: string;
  accountType?: string;
  branchCode?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Add timeout to fetch requests
const fetchWithTimeout = (url: string, options: RequestInit, timeout = 30000) => {
  return Promise.race([
    fetch(url, options),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error(`Request timeout (${timeout}ms)`)), timeout)
    ),
  ]);
};

export const profileService = {
  /**
   * Get user profile
   */
  async getProfile(token: string): Promise<UserProfile> {
    try {
      const response = await fetchWithTimeout(`${BACKEND_URL}/profile/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },

  /**
   * Update user profile
   */
  async updateProfile(token: string, data: {
    fullName: string;
    email: string;
    phone: string;
    location?: string;
  }): Promise<{ message: string; data: any }> {
    try {
      const response = await fetchWithTimeout(`${BACKEND_URL}/profile/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },

  /**
   * Change password
   */
  async changePassword(token: string, data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<{ message: string }> {
    try {
      const response = await fetchWithTimeout(`${BACKEND_URL}/profile/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  },
};

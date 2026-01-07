import jwt from 'jsonwebtoken';
import { supabase } from '../utils/supabase';
import { SignupRequest, LoginRequest, AuthResponse } from '../types/auth';
import env from '../config/env';

export const authService = {
  async signup(data: SignupRequest): Promise<AuthResponse> {
    const { fullName, email, password } = data;

    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    });

    if (error || !authData.user) {
      throw new Error(error?.message ?? 'Signup failed.');
    }

    if (!authData.user.email) {
      throw new Error('User email is required.');
    }

    return {
      user: {
        id: authData.user.id,
        email: authData.user.email,
        full_name: authData.user.user_metadata?.full_name ?? ''
      }
    };
  },

  async login(data: LoginRequest): Promise<AuthResponse> {
    const { email, password } = data;

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Supabase login error:', {
        message: error.message,
        status: error.status,
        email: email,
      });
      throw new Error(error.message ?? 'Invalid email or password.');
    }

    if (!authData.user) {
      console.error('No user returned from Supabase login for email:', email);
      throw new Error('Login failed - user not found.');
    }

    if (!authData.user.email) {
      throw new Error('User email is required.');
    }

    const token = jwt.sign(
      { id: authData.user.id, email: authData.user.email },
      env.jwtSecret,
      { expiresIn: '7d' }
    );

    return {
      user: {
        id: authData.user.id,
        email: authData.user.email,
        full_name: authData.user.user_metadata?.full_name ?? ''
      },
      token
    };
  },

  async getUserById(userId: string): Promise<{ id: string; email: string; full_name: string }> {
    const { data, error } = await supabase.auth.admin.getUserById(userId);

    if (error || !data.user) {
      throw new Error('User not found.');
    }

    return {
      id: data.user.id,
      email: data.user.email ?? '',
      full_name: data.user.user_metadata?.full_name ?? ''
    };
  }
};


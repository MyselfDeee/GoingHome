export interface SignupRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    full_name: string;
  };
  token?: string;
}

export interface ErrorResponse {
  error: string;
}

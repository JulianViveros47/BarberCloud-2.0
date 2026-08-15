import { LoginRequest, RegisterRequest, AuthResponse } from '@/types/api';
import { clearAuthToken, post, setAuthToken } from './api';

export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  const response = await post<AuthResponse>('/auth/login', credentials);
  if (response.token) {
    setAuthToken(response.token);
  }
  return response;
}

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const response = await post<AuthResponse>('/auth/register', data);
  if (response.token) {
    setAuthToken(response.token);
  }
  return response;
}

export function logout(): void {
  clearAuthToken();
}

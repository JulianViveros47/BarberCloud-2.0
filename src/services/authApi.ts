import { LoginRequest, RegisterRequest, AuthResponse } from '@/types/api';
import { clearAuthToken, getAuthToken, post, setAuthToken } from './api';

const SELECTED_BARBERSHOP_KEY = 'barbercloud_selected_barbershop_id';

export interface CurrentUser {
  email: string;
  userId?: string;
  role?: string;
}

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
  localStorage.removeItem(SELECTED_BARBERSHOP_KEY);
}

export function getCurrentUser(): CurrentUser | null {
  const token = getAuthToken();
  if (!token) {
    return null;
  }

  try {
    const [, payload] = token.split('.');
    if (!payload) {
      return null;
    }

    const normalizedPayload = payload
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(Math.ceil(payload.length / 4) * 4, '=');
    const decodedPayload = JSON.parse(atob(normalizedPayload)) as {
      sub?: string;
      userId?: string;
      role?: string;
    };

    if (!decodedPayload.sub) {
      return null;
    }

    return {
      email: decodedPayload.sub,
      userId: decodedPayload.userId,
      role: decodedPayload.role,
    };
  } catch {
    return null;
  }
}

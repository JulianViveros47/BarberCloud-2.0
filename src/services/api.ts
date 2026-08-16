import { ApiError } from '@/types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const AUTH_TOKEN_KEY = 'barbercloud_auth_token';

/**
 * Get stored auth token from localStorage
 */
export function getAuthToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function hasValidAuthToken(): boolean {
  const token = getAuthToken();
  if (!token) {
    return false;
  }

  try {
    const [, payload] = token.split('.');
    if (!payload) {
      clearAuthToken();
      return false;
    }

    const normalizedPayload = payload
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(Math.ceil(payload.length / 4) * 4, '=');
    const decodedPayload = JSON.parse(atob(normalizedPayload)) as { exp?: number };

    if (decodedPayload.exp && decodedPayload.exp * 1000 <= Date.now()) {
      clearAuthToken();
      return false;
    }

    return true;
  } catch {
    clearAuthToken();
    return false;
  }
}

/**
 * Store auth token in localStorage
 */
export function setAuthToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

/**
 * Clear auth token from localStorage
 */
export function clearAuthToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

/**
 * Generic HTTP request function with centralized error handling
 */
async function request<T>(
  endpoint: string,
  options: RequestInit & { method?: string } = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Attach JWT token if available
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const contentType = response.headers.get('content-type');
  const hasJsonBody = contentType?.includes('application/json');
  const data = response.status === 204 || !hasJsonBody ? null : await response.json().catch(() => null);

  if (response.status === 401) {
    clearAuthToken();
  }

  if (!response.ok) {
    const error = new Error(data?.message || `HTTP ${response.status}: ${response.statusText}`) as Error & ApiError;
    error.status = response.status;
    error.error = data?.error;
    throw error;
  }

  return data as T;
}

/**
 * GET request
 */
export async function get<T>(endpoint: string): Promise<T> {
  return request<T>(endpoint, { method: 'GET' });
}

/**
 * POST request
 */
export async function post<T>(endpoint: string, body?: unknown): Promise<T> {
  return request<T>(endpoint, {
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
  });
}

/**
 * PUT request
 */
export async function put<T>(endpoint: string, body?: unknown): Promise<T> {
  return request<T>(endpoint, {
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
  });
}

/**
 * DELETE request
 */
export async function del<T>(endpoint: string): Promise<T> {
  return request<T>(endpoint, { method: 'DELETE' });
}

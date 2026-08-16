// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'SUPER_ADMIN' | 'BARBERSHOP_ADMIN' | 'BARBER' | 'CLIENT';
}

export interface AuthResponse {
  token: string;
  tokenType: string;
}

// Product Types
export interface ProductResponse {
  id: string;
  barberShopId: string;
  name: string;
  description: string | null;
  priceInCents: number;
  stock: number;
  active: boolean;
  createdAt: string;
}

export interface ProductRequest {
  barberShopId: string;
  name: string;
  description?: string;
  priceInCents: number;
  stock: number;
}

// Service Types
export interface ServiceItemResponse {
  id: string;
  barberShopId: string;
  name: string;
  description: string | null;
  priceInCents: number;
  durationMinutes: number;
  active: boolean;
  createdAt: string;
}

export interface ServiceItemRequest {
  barberShopId: string;
  name: string;
  description?: string;
  priceInCents: number;
  durationMinutes: number;
}

// BarberShop Types
export interface BarberShopResponse {
  id: string;
  name: string;
  slug: string;
  ownerUserId: string | null;
  description: string;
  phone: string;
  email: string;
  active: boolean;
  createdAt: string;
}

export interface BarberShopRequest {
  name: string;
  description: string;
  phone: string;
  email: string;
}

// API Error Response
export interface ApiError {
  status?: number;
  message: string;
  error?: string;
}

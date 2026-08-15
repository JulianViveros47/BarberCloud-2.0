import { BarberShopResponse, BarberShopRequest } from '@/types/api';
import { get, post, put, del } from './api';

export async function getBarberShops(): Promise<BarberShopResponse[]> {
  return get<BarberShopResponse[]>('/barber-shops');
}

export async function getBarberShop(id: string): Promise<BarberShopResponse> {
  return get<BarberShopResponse>(`/barber-shops/${id}`);
}

export async function createBarberShop(data: BarberShopRequest): Promise<BarberShopResponse> {
  return post<BarberShopResponse>('/barber-shops', data);
}

export async function updateBarberShop(id: string, data: BarberShopRequest): Promise<BarberShopResponse> {
  return put<BarberShopResponse>(`/barber-shops/${id}`, data);
}

export async function deleteBarberShop(id: string): Promise<void> {
  await del<void>(`/barber-shops/${id}`);
}

import { ProductResponse, ProductRequest } from '@/types/api';
import { get, post, put, del } from './api';

export async function getProducts(): Promise<ProductResponse[]> {
  return get<ProductResponse[]>('/products');
}

export async function getProduct(id: string): Promise<ProductResponse> {
  return get<ProductResponse>(`/products/${id}`);
}

export async function getProductsByBarberShop(barberShopId: string): Promise<ProductResponse[]> {
  return get<ProductResponse[]>(`/products/barber-shop/${barberShopId}`);
}

export async function createProduct(data: ProductRequest): Promise<ProductResponse> {
  return post<ProductResponse>('/products', data);
}

export async function updateProduct(id: string, data: ProductRequest): Promise<ProductResponse> {
  return put<ProductResponse>(`/products/${id}`, data);
}

export async function deleteProduct(id: string): Promise<void> {
  await del<void>(`/products/${id}`);
}

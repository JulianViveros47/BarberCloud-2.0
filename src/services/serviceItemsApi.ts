import { ServiceItemRequest, ServiceItemResponse } from "@/types/api";
import { del, get, post, put } from "./api";

export async function getServiceItems(): Promise<ServiceItemResponse[]> {
  return get<ServiceItemResponse[]>("/services");
}

export async function getServiceItem(id: string): Promise<ServiceItemResponse> {
  return get<ServiceItemResponse>(`/services/${id}`);
}

export async function getServiceItemsByBarberShop(barberShopId: string): Promise<ServiceItemResponse[]> {
  return get<ServiceItemResponse[]>(`/services/barber-shop/${barberShopId}`);
}

export async function createServiceItem(data: ServiceItemRequest): Promise<ServiceItemResponse> {
  return post<ServiceItemResponse>("/services", data);
}

export async function updateServiceItem(id: string, data: ServiceItemRequest): Promise<ServiceItemResponse> {
  return put<ServiceItemResponse>(`/services/${id}`, data);
}

export async function deleteServiceItem(id: string): Promise<void> {
  return del<void>(`/services/${id}`);
}

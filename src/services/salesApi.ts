import { SaleRequest, SaleResponse } from "@/types/api";
import { get, post } from "./api";

export async function createSale(data: SaleRequest): Promise<SaleResponse> {
  return post<SaleResponse>("/sales", data);
}

export async function getSalesByBarberShop(barberShopId: string): Promise<SaleResponse[]> {
  return get<SaleResponse[]>(`/sales/barber-shop/${barberShopId}`);
}

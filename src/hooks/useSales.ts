import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productQueryKeys } from "@/hooks/useProducts";
import { createSale, getSalesByBarberShop } from "@/services/salesApi";
import { SaleRequest } from "@/types/api";

export const saleQueryKeys = {
  byBarberShop: (barberShopId: string) => ["sales", "barber-shop", barberShopId] as const,
};

export function useSalesByBarberShop(barberShopId?: string) {
  return useQuery({
    queryKey: saleQueryKeys.byBarberShop(barberShopId || ""),
    queryFn: () => getSalesByBarberShop(barberShopId || ""),
    enabled: Boolean(barberShopId),
  });
}

export function useCreateSale() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SaleRequest) => createSale(data),
    onSuccess: (sale) => {
      queryClient.invalidateQueries({ queryKey: saleQueryKeys.byBarberShop(sale.barberShopId) });
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: productQueryKeys.byBarberShop(sale.barberShopId) });
    },
  });
}

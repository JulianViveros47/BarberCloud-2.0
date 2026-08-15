import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBarberShop, getBarberShops } from "@/services/barberShopsApi";
import { BarberShopRequest } from "@/types/api";

export const barberShopQueryKeys = {
  all: ["barber-shops"] as const,
};

export function useBarberShops() {
  return useQuery({
    queryKey: barberShopQueryKeys.all,
    queryFn: getBarberShops,
  });
}

export function useCreateBarberShop() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BarberShopRequest) => createBarberShop(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: barberShopQueryKeys.all });
    },
  });
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createServiceItem,
  deleteServiceItem,
  getServiceItem,
  getServiceItems,
  getServiceItemsByBarberShop,
  updateServiceItem,
} from "@/services/serviceItemsApi";
import { ServiceItemRequest } from "@/types/api";

export const serviceItemQueryKeys = {
  all: ["services"] as const,
  byBarberShop: (barberShopId: string) => ["services", "barber-shop", barberShopId] as const,
  detail: (id: string) => ["service", id] as const,
};

export function useServiceItems(barberShopId?: string) {
  return useQuery({
    queryKey: barberShopId ? serviceItemQueryKeys.byBarberShop(barberShopId) : serviceItemQueryKeys.all,
    queryFn: () => (barberShopId ? getServiceItemsByBarberShop(barberShopId) : getServiceItems()),
  });
}

export function useServiceItem(id?: string) {
  return useQuery({
    queryKey: serviceItemQueryKeys.detail(id || ""),
    queryFn: () => getServiceItem(id || ""),
    enabled: Boolean(id),
  });
}

export function useCreateServiceItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ServiceItemRequest) => createServiceItem(data),
    onSuccess: (serviceItem) => {
      queryClient.invalidateQueries({ queryKey: serviceItemQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: serviceItemQueryKeys.byBarberShop(serviceItem.barberShopId) });
    },
  });
}

export function useUpdateServiceItem(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ServiceItemRequest) => updateServiceItem(id, data),
    onSuccess: (serviceItem) => {
      queryClient.invalidateQueries({ queryKey: serviceItemQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: serviceItemQueryKeys.byBarberShop(serviceItem.barberShopId) });
      queryClient.invalidateQueries({ queryKey: serviceItemQueryKeys.detail(serviceItem.id) });
    },
  });
}

export function useDeleteServiceItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteServiceItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceItemQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: ["services", "barber-shop"] });
    },
  });
}

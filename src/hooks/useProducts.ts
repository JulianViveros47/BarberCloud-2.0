import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  getProductsByBarberShop,
  updateProduct,
} from "@/services/productsApi";
import { ProductRequest } from "@/types/api";

export const productQueryKeys = {
  all: ["products"] as const,
  byBarberShop: (barberShopId: string) => ["products", "barber-shop", barberShopId] as const,
  detail: (id: string) => ["product", id] as const,
};

export function useProducts(barberShopId?: string) {
  return useQuery({
    queryKey: barberShopId ? productQueryKeys.byBarberShop(barberShopId) : productQueryKeys.all,
    queryFn: () => (barberShopId ? getProductsByBarberShop(barberShopId) : getProducts()),
  });
}

export function useProduct(id?: string) {
  return useQuery({
    queryKey: productQueryKeys.detail(id || ""),
    queryFn: () => getProduct(id || ""),
    enabled: Boolean(id),
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProductRequest) => createProduct(data),
    onSuccess: (product) => {
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: productQueryKeys.byBarberShop(product.barberShopId) });
    },
  });
}

export function useUpdateProduct(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProductRequest) => updateProduct(id, data),
    onSuccess: (product) => {
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: productQueryKeys.byBarberShop(product.barberShopId) });
      queryClient.invalidateQueries({ queryKey: productQueryKeys.detail(product.id) });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: ["products", "barber-shop"] });
    },
  });
}

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Store } from "lucide-react";
import { ProductTable } from "@/components/products/ProductTable";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useBarberShops, useCreateBarberShop } from "@/hooks/useBarberShops";
import { useCreateProduct, useProducts } from "@/hooks/useProducts";

const SELECTED_BARBERSHOP_KEY = "barbercloud_selected_barbershop_id";

const RegisterProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBarberShopId, setSelectedBarberShopId] = useState(
    () => localStorage.getItem(SELECTED_BARBERSHOP_KEY) || "",
  );
  const itemsPerPage = 10;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    stock: "",
    price: "",
  });
  const [shopFormData, setShopFormData] = useState({
    name: "",
    description: "",
    phone: "",
    email: "",
  });

  const { t } = useTranslation();
  const barberShopsQuery = useBarberShops();
  const createBarberShopMutation = useCreateBarberShop();
  const productsQuery = useProducts(selectedBarberShopId || undefined);
  const createProductMutation = useCreateProduct();

  const activeBarberShops = useMemo(
    () => (barberShopsQuery.data || []).filter((shop) => shop.active),
    [barberShopsQuery.data],
  );

  useEffect(() => {
    if (!selectedBarberShopId && activeBarberShops.length > 0) {
      setSelectedBarberShopId(activeBarberShops[0].id);
      localStorage.setItem(SELECTED_BARBERSHOP_KEY, activeBarberShops[0].id);
    }
  }, [activeBarberShops, selectedBarberShopId]);

  const activeProducts = useMemo(
    () => (productsQuery.data || []).filter((product) => product.active),
    [productsQuery.data],
  );

  const totalPages = Math.max(1, Math.ceil(activeProducts.length / itemsPerPage));
  const paginatedProducts = activeProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleBarberShopChange = (value: string) => {
    setSelectedBarberShopId(value);
    localStorage.setItem(SELECTED_BARBERSHOP_KEY, value);
    setCurrentPage(1);
  };

  const handleCreateBarberShop = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const created = await createBarberShopMutation.mutateAsync(shopFormData);
      setSelectedBarberShopId(created.id);
      localStorage.setItem(SELECTED_BARBERSHOP_KEY, created.id);
      setShopFormData({ name: "", description: "", phone: "", email: "" });
      toast.success("Barberia creada correctamente");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo crear la barberia");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const price = Number(formData.price);
    const stock = Number(formData.stock);

    if (!selectedBarberShopId) {
      toast.error("Selecciona una barberia antes de crear productos");
      return;
    }

    if (price < 0 || stock < 0 || !Number.isInteger(stock)) {
      toast.error("El precio no puede ser negativo y el stock debe ser entero");
      return;
    }

    try {
      await createProductMutation.mutateAsync({
        barberShopId: selectedBarberShopId,
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        priceInCents: Math.round(price * 100),
        stock,
      });
      setFormData({ name: "", description: "", stock: "", price: "" });
      setCurrentPage(1);
      toast.success("Producto creado correctamente");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo crear el producto");
    }
  };

  const isLoading = barberShopsQuery.isLoading || productsQuery.isLoading;
  const errorMessage =
    barberShopsQuery.error instanceof Error
      ? barberShopsQuery.error.message
      : productsQuery.error instanceof Error
        ? productsQuery.error.message
        : "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <Card className="shadow-[var(--shadow-strong)]">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
                <Plus className="w-6 h-6 text-primary" />
                {t("product.titleRegister")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activeBarberShops.length > 0 && (
                <div className="space-y-2 mb-4">
                  <Label>Barberia *</Label>
                  <Select value={selectedBarberShopId} onValueChange={handleBarberShopChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una barberia" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeBarberShops.map((shop) => (
                        <SelectItem key={shop.id} value={shop.id}>
                          {shop.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {activeBarberShops.length === 0 && !barberShopsQuery.isLoading ? (
                <form onSubmit={handleCreateBarberShop} className="space-y-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Store className="w-5 h-5" />
                    <span>Crea una barberia para registrar productos.</span>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shopName">Nombre *</Label>
                    <Input
                      id="shopName"
                      value={shopFormData.name}
                      onChange={(e) => setShopFormData({ ...shopFormData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shopDescription">Descripcion</Label>
                    <Textarea
                      id="shopDescription"
                      value={shopFormData.description}
                      onChange={(e) => setShopFormData({ ...shopFormData, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="shopPhone">Telefono *</Label>
                      <Input
                        id="shopPhone"
                        value={shopFormData.phone}
                        onChange={(e) => setShopFormData({ ...shopFormData, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shopEmail">Email *</Label>
                      <Input
                        id="shopEmail"
                        type="email"
                        value={shopFormData.email}
                        onChange={(e) => setShopFormData({ ...shopFormData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={createBarberShopMutation.isPending}>
                    {createBarberShopMutation.isPending ? "Creando..." : "Crear barberia"}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("product.name")} *</Label>
                    <Input
                      id="name"
                      placeholder="Nombre del producto"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">{t("product.description")}</Label>
                    <Textarea
                      id="description"
                      placeholder="Descripcion detallada"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="stock">{t("product.quantity")} *</Label>
                      <Input
                        id="stock"
                        type="number"
                        min="0"
                        step="1"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">{t("product.price")} *</Label>
                      <Input
                        id="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={createProductMutation.isPending}>
                    {createProductMutation.isPending ? "Creando..." : t("product.registerProduct")}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-strong)]">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">{t("product.titleRegistered")}</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading && <p className="text-muted-foreground">Cargando productos...</p>}
              {errorMessage && <p className="text-destructive">{errorMessage}</p>}
              {!isLoading && !errorMessage && (
                <div className="overflow-x-auto">
                  <ProductTable
                    products={paginatedProducts}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterProducts;

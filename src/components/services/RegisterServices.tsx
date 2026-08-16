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
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useBarberShops } from "@/hooks/useBarberShops";
import { useCreateServiceItem, useServiceItems } from "@/hooks/useServiceItems";
import { ServiceItemTable } from "@/components/services/ServiceItemTable";

const SELECTED_BARBERSHOP_KEY = "barbercloud_selected_barbershop_id";

const RegisterServices = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBarberShopId, setSelectedBarberShopId] = useState(
    () => localStorage.getItem(SELECTED_BARBERSHOP_KEY) || "",
  );
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    durationMinutes: "",
    price: "",
  });
  const itemsPerPage = 10;

  const barberShopsQuery = useBarberShops();
  const servicesQuery = useServiceItems(selectedBarberShopId || undefined);
  const createServiceMutation = useCreateServiceItem();

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

  const activeServices = useMemo(
    () => (servicesQuery.data || []).filter((service) => service.active),
    [servicesQuery.data],
  );

  const totalPages = Math.max(1, Math.ceil(activeServices.length / itemsPerPage));
  const paginatedServices = activeServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleBarberShopChange = (value: string) => {
    setSelectedBarberShopId(value);
    localStorage.setItem(SELECTED_BARBERSHOP_KEY, value);
    setCurrentPage(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const price = Number(formData.price);
    const durationMinutes = Number(formData.durationMinutes);

    if (!selectedBarberShopId) {
      toast.error("Selecciona una barberia antes de crear servicios");
      return;
    }

    if (price < 0 || durationMinutes < 1 || !Number.isInteger(durationMinutes)) {
      toast.error("El precio no puede ser negativo y la duracion debe ser un entero mayor a cero");
      return;
    }

    try {
      await createServiceMutation.mutateAsync({
        barberShopId: selectedBarberShopId,
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        priceInCents: Math.round(price * 100),
        durationMinutes,
      });
      setFormData({ name: "", description: "", durationMinutes: "", price: "" });
      setCurrentPage(1);
      toast.success("Servicio creado correctamente");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo crear el servicio");
    }
  };

  const isLoading = barberShopsQuery.isLoading || servicesQuery.isLoading;
  const errorMessage =
    barberShopsQuery.error instanceof Error
      ? barberShopsQuery.error.message
      : servicesQuery.error instanceof Error
        ? servicesQuery.error.message
        : "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <Card className="shadow-[var(--shadow-strong)]">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
                <Plus className="w-6 h-6 text-primary" />
                Registrar Nuevo Servicio
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activeBarberShops.length > 0 ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
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

                  <div className="space-y-2">
                    <Label htmlFor="serviceName">Nombre *</Label>
                    <Input
                      id="serviceName"
                      placeholder="Nombre del servicio"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serviceDescription">Descripcion</Label>
                    <Textarea
                      id="serviceDescription"
                      placeholder="Descripcion detallada"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="durationMinutes">Duracion en minutos *</Label>
                      <Input
                        id="durationMinutes"
                        type="number"
                        min="1"
                        step="1"
                        value={formData.durationMinutes}
                        onChange={(e) => setFormData({ ...formData, durationMinutes: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="servicePrice">Precio *</Label>
                      <Input
                        id="servicePrice"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={createServiceMutation.isPending}>
                    {createServiceMutation.isPending ? "Creando..." : "Registrar Servicio"}
                  </Button>
                </form>
              ) : (
                <p className="text-muted-foreground">Crea una barberia para registrar servicios.</p>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-strong)]">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">Servicios Registrados</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading && <p className="text-muted-foreground">Cargando servicios...</p>}
              {errorMessage && <p className="text-destructive">{errorMessage}</p>}
              {!isLoading && !errorMessage && (
                <div className="overflow-x-auto">
                  <ServiceItemTable
                    services={paginatedServices}
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

export default RegisterServices;

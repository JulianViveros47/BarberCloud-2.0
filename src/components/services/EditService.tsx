import { useEffect, useState } from "react";
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
import { Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useBarberShops } from "@/hooks/useBarberShops";
import { useServiceItem, useUpdateServiceItem } from "@/hooks/useServiceItems";

const EditService = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const serviceQuery = useServiceItem(serviceId);
  const barberShopsQuery = useBarberShops();
  const updateServiceMutation = useUpdateServiceItem(serviceId || "");

  const [formData, setFormData] = useState({
    barberShopId: "",
    name: "",
    description: "",
    durationMinutes: "",
    price: "",
  });

  useEffect(() => {
    if (serviceQuery.data) {
      setFormData({
        barberShopId: serviceQuery.data.barberShopId,
        name: serviceQuery.data.name,
        description: serviceQuery.data.description || "",
        durationMinutes: serviceQuery.data.durationMinutes.toString(),
        price: (serviceQuery.data.priceInCents / 100).toString(),
      });
    }
  }, [serviceQuery.data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const price = Number(formData.price);
    const durationMinutes = Number(formData.durationMinutes);

    if (price < 0 || durationMinutes < 1 || !Number.isInteger(durationMinutes)) {
      toast.error("El precio no puede ser negativo y la duracion debe ser un entero mayor a cero");
      return;
    }

    try {
      await updateServiceMutation.mutateAsync({
        barberShopId: formData.barberShopId,
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        priceInCents: Math.round(price * 100),
        durationMinutes,
      });
      toast.success("Servicio actualizado correctamente");
      navigate("/home-service-modify");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo actualizar el servicio");
    }
  };

  if (serviceQuery.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-accent/10 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center text-muted-foreground">
            Cargando servicio...
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!serviceId || serviceQuery.error || !serviceQuery.data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-accent/10 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">Servicio no encontrado</p>
            {serviceQuery.error instanceof Error && (
              <p className="text-destructive mb-4">{serviceQuery.error.message}</p>
            )}
            <Button onClick={() => navigate("/home-service-modify")}>Volver</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="shadow-[var(--shadow-strong)]">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Save className="w-7 h-7 text-primary" />
              Editar Servicio: {serviceQuery.data.id}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="serviceId">ID del Servicio</Label>
                <Input id="serviceId" value={serviceQuery.data.id} disabled className="bg-muted" />
              </div>

              <div className="space-y-2">
                <Label>Barberia *</Label>
                <Select
                  value={formData.barberShopId}
                  onValueChange={(value) => setFormData({ ...formData, barberShopId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una barberia" />
                  </SelectTrigger>
                  <SelectContent>
                    {(barberShopsQuery.data || [])
                      .filter((shop) => shop.active)
                      .map((shop) => (
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
                  placeholder="Descripcion detallada del servicio"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
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

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1" size="lg" disabled={updateServiceMutation.isPending}>
                  <Save className="w-4 h-4 mr-2" />
                  {updateServiceMutation.isPending ? "Guardando..." : "Guardar Cambios"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/home-service-modify")}
                  size="lg"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditService;

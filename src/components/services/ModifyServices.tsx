import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ServiceItem, ServiceItemTable } from "@/components/services/ServiceItemTable";
import { useDeleteServiceItem, useServiceItems } from "@/hooks/useServiceItems";

const ModifyServices = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const servicesQuery = useServiceItems();
  const deleteServiceMutation = useDeleteServiceItem();

  const activeServices = useMemo(
    () => (servicesQuery.data || []).filter((service) => service.active),
    [servicesQuery.data],
  );

  const totalPages = Math.max(1, Math.ceil(activeServices.length / itemsPerPage));
  const paginatedServices = activeServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleEdit = (service: ServiceItem) => {
    navigate(`/home-service-edit/${service.id}`);
  };

  const handleDelete = async (service: ServiceItem) => {
    try {
      await deleteServiceMutation.mutateAsync(service.id);
      toast.success("Servicio eliminado correctamente");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo eliminar el servicio");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
      <div className="container mx-auto px-4 py-8">
        <Card className="shadow-[var(--shadow-strong)]">
          <CardHeader>
            <CardTitle className="text-3xl">Modificar Servicio</CardTitle>
            <p className="text-muted-foreground mt-2">
              Selecciona un servicio para editar su informacion
            </p>
          </CardHeader>
          <CardContent>
            {servicesQuery.isLoading && <p className="text-muted-foreground">Cargando servicios...</p>}
            {servicesQuery.error instanceof Error && (
              <p className="text-destructive">{servicesQuery.error.message}</p>
            )}
            {!servicesQuery.isLoading && !servicesQuery.error && (
              <ServiceItemTable
                services={paginatedServices}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                onEdit={handleEdit}
                onDelete={handleDelete}
                showEditButton
                showDeleteButton
                isDeleting={deleteServiceMutation.isPending}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModifyServices;

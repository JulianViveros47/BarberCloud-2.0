import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ServiceItemResponse } from "@/types/api";

export type ServiceItem = ServiceItemResponse;

interface ServiceItemTableProps {
  services: ServiceItem[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEdit?: (service: ServiceItem) => void;
  onDelete?: (service: ServiceItem) => void;
  showEditButton?: boolean;
  showDeleteButton?: boolean;
  isDeleting?: boolean;
}

const formatPrice = (priceInCents: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 2,
  }).format(priceInCents / 100);

export const ServiceItemTable = ({
  services,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
  showEditButton = false,
  showDeleteButton = false,
  isDeleting = false,
}: ServiceItemTableProps) => {
  if (services.length === 0) {
    return (
      <div className="rounded-md border p-6 text-center text-muted-foreground">
        Aun no hay servicios registrados.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID del Servicio</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripcion</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Duracion</TableHead>
              <TableHead>Estado</TableHead>
              {(showEditButton || showDeleteButton) && <TableHead className="text-right">Acciones</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="max-w-36 truncate font-medium" title={service.id}>
                  {service.id}
                </TableCell>
                <TableCell>{service.name}</TableCell>
                <TableCell className="max-w-64 truncate">
                  {service.description || "Sin descripcion"}
                </TableCell>
                <TableCell>{formatPrice(service.priceInCents)}</TableCell>
                <TableCell>{service.durationMinutes} min</TableCell>
                <TableCell>
                  {service.active ? (
                    <span className="text-green-600 font-medium">Activo</span>
                  ) : (
                    <span className="text-red-600 font-medium">Inactivo</span>
                  )}
                </TableCell>
                {(showEditButton || showDeleteButton) && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {showEditButton && (
                        <Button variant="outline" size="sm" onClick={() => onEdit?.(service)}>
                          <Edit className="w-4 h-4 mr-1" />
                          Editar
                        </Button>
                      )}
                      {showDeleteButton && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" disabled={isDeleting}>
                              <Trash2 className="w-4 h-4 mr-1" />
                              Eliminar
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Eliminar servicio</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta accion desactivara el servicio y dejara de mostrarse en la lista.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => onDelete?.(service)}>
                                Confirmar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => onPageChange(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

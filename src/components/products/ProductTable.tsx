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
import { ProductResponse } from "@/types/api";
import { useTranslation } from "react-i18next";

export type Product = ProductResponse;

interface ProductTableProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
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

export const ProductTable = ({
  products,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
  showEditButton = false,
  showDeleteButton = false,
  isDeleting = false,
}: ProductTableProps) => {
  const { t } = useTranslation();

  if (products.length === 0) {
    return (
      <div className="rounded-md border p-6 text-center text-muted-foreground">
        Aun no hay productos registrados.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("product.id")}</TableHead>
              <TableHead>{t("product.nameTable")}</TableHead>
              <TableHead>{t("product.description")}</TableHead>
              <TableHead>{t("product.priceTable")}</TableHead>
              <TableHead>{t("product.quantityTable")}</TableHead>
              <TableHead>{t("product.stateTable")}</TableHead>
              {(showEditButton || showDeleteButton) && (
                <TableHead className="text-right">{t("product.actions")}</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="max-w-36 truncate font-medium" title={product.id}>
                  {product.id}
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell className="max-w-64 truncate">
                  {product.description || "Sin descripcion"}
                </TableCell>
                <TableCell>{formatPrice(product.priceInCents)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  {product.active ? (
                    <span className="text-green-600 font-medium">{t("product.active")}</span>
                  ) : (
                    <span className="text-red-600 font-medium">{t("product.inactive")}</span>
                  )}
                </TableCell>
                {(showEditButton || showDeleteButton) && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {showEditButton && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit?.(product)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          {t("product.edit")}
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
                              <AlertDialogTitle>Eliminar producto</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta accion desactivara el producto y dejara de mostrarse en la lista.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => onDelete?.(product)}>
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

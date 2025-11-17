import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useTranslation } from "react-i18next";

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  colors: string[];
  quantity: number;
  category: string;
  price: number;
  disabled?: boolean; // ✅ Agregar esto
}

interface ProductTableProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEdit?: (product: Product) => void;
  showEditButton?: boolean;
}

export const ProductTable = ({
  products,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  showEditButton = false,
}: ProductTableProps) => {

  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("product.id")}</TableHead>
              <TableHead>{t("product.nameTable")}</TableHead>
              <TableHead>{t("product.categoryTable")}</TableHead>
              <TableHead>{t("product.priceTable")}</TableHead>
              <TableHead>{t("product.quantityTable")}</TableHead>
              <TableHead>{t("product.colorsTable")}</TableHead>
              <TableHead>{t("product.stateTable")}</TableHead>
              {showEditButton && <TableHead className="text-right">{t("product.actions")}</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {product.colors.slice(0, 3).map((color, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 rounded-full border-2 border-border"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                    {product.colors.length > 3 && (
                      <span className="text-xs text-muted-foreground ml-1">
                        +{product.colors.length - 3}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {product.disabled ? (
                    <span className="text-red-600 font-medium">{t("product.inactive")}</span>
                  ) : (
                    <span className="text-green-600 font-medium">{t("product.active")}</span>
                  )}
                </TableCell>
                {showEditButton && (
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit?.(product)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      {t("product.edit")}
                    </Button>
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

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

export interface Review {
  id: string; // <-- Se mantiene internamente para key y edición, pero NO se muestra en tabla
  cantidadEstrellas: number;
  observacion: string;
}

interface ReviewsTableProps {
  reviews: Review[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEdit?: (review: Review) => void;
  showEditButton?: boolean;
}

export const ReviewsTable = ({
  reviews,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  showEditButton = false,
}: ReviewsTableProps) => {

  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto w-full mb-8">
    <div className="space-y-4">
      <div className="rounded-md border mb-8 ">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>{t("reviews.cantidadEstrellas")}</TableHead>
              <TableHead>{t("reviews.observacion")}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>
                  {"⭐".repeat(review.cantidadEstrellas)}
                </TableCell>

                <TableCell className="max-w-xs truncate md:max-w-md lg:max-w-lg">
                  {review.observacion}
                </TableCell>

                {showEditButton && (
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit?.(review)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      {t("reviews.edit")}
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      </div>

      {totalPages > 1 && (
        <Pagination className="mb-8">
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

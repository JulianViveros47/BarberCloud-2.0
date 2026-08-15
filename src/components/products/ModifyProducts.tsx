import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Product, ProductTable } from "@/components/products/ProductTable";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useDeleteProduct, useProducts } from "@/hooks/useProducts";

const ModifyProducts = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { t } = useTranslation();
  const productsQuery = useProducts();
  const deleteProductMutation = useDeleteProduct();

  const activeProducts = useMemo(
    () => (productsQuery.data || []).filter((product) => product.active),
    [productsQuery.data],
  );

  const totalPages = Math.max(1, Math.ceil(activeProducts.length / itemsPerPage));
  const paginatedProducts = activeProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleEdit = (product: Product) => {
    navigate(`/home-product-edit/${product.id}`);
  };

  const handleDelete = async (product: Product) => {
    try {
      await deleteProductMutation.mutateAsync(product.id);
      toast.success("Producto eliminado correctamente");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo eliminar el producto");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
      <div className="container mx-auto px-4 py-8">
        <Card className="shadow-[var(--shadow-strong)]">
          <CardHeader>
            <CardTitle className="text-3xl">{t("product.titleModify")}</CardTitle>
            <p className="text-muted-foreground mt-2">
              {t("product.selectProduct")}
            </p>
          </CardHeader>
          <CardContent>
            {productsQuery.isLoading && <p className="text-muted-foreground">Cargando productos...</p>}
            {productsQuery.error instanceof Error && (
              <p className="text-destructive">{productsQuery.error.message}</p>
            )}
            {!productsQuery.isLoading && !productsQuery.error && (
              <ProductTable
                products={paginatedProducts}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                onEdit={handleEdit}
                onDelete={handleDelete}
                showEditButton
                showDeleteButton
                isDeleting={deleteProductMutation.isPending}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModifyProducts;

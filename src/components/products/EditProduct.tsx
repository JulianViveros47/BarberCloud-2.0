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
import { useTranslation } from "react-i18next";
import { useBarberShops } from "@/hooks/useBarberShops";
import { useProduct, useUpdateProduct } from "@/hooks/useProducts";

const EditProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { t } = useTranslation();
  const productQuery = useProduct(productId);
  const barberShopsQuery = useBarberShops();
  const updateProductMutation = useUpdateProduct(productId || "");

  const [formData, setFormData] = useState({
    barberShopId: "",
    name: "",
    description: "",
    stock: "",
    price: "",
  });

  useEffect(() => {
    if (productQuery.data) {
      setFormData({
        barberShopId: productQuery.data.barberShopId,
        name: productQuery.data.name,
        description: productQuery.data.description || "",
        stock: productQuery.data.stock.toString(),
        price: (productQuery.data.priceInCents / 100).toString(),
      });
    }
  }, [productQuery.data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const price = Number(formData.price);
    const stock = Number(formData.stock);

    if (price < 0 || stock < 0 || !Number.isInteger(stock)) {
      toast.error("El precio no puede ser negativo y el stock debe ser entero");
      return;
    }

    try {
      await updateProductMutation.mutateAsync({
        barberShopId: formData.barberShopId,
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        priceInCents: Math.round(price * 100),
        stock,
      });
      toast.success("Producto actualizado correctamente");
      navigate("/home-product-modify");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo actualizar el producto");
    }
  };

  if (productQuery.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-accent/10 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center text-muted-foreground">
            Cargando producto...
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!productId || productQuery.error || !productQuery.data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-accent/10 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">{t("product.notFound")}</p>
            {productQuery.error instanceof Error && (
              <p className="text-destructive mb-4">{productQuery.error.message}</p>
            )}
            <Button onClick={() => navigate("/home-product-modify")}>
              {t("product.back")}
            </Button>
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
              {t("product.titleEdit")}: {productQuery.data.id}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="id">{t("product.id")}</Label>
                <Input id="id" value={productQuery.data.id} disabled className="bg-muted" />
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
                  placeholder="Descripcion detallada del producto"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="stock">{t("product.quantity")} *</Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="0"
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
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1" size="lg" disabled={updateProductMutation.isPending}>
                  <Save className="w-4 h-4 mr-2" />
                  {updateProductMutation.isPending ? "Guardando..." : t("product.save")}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/home-product-modify")}
                  size="lg"
                >
                  {t("product.cancel")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditProduct;

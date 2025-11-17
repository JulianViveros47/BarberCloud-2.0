import { useState } from "react";
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
import { ArrowLeft, Save, Upload } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Product } from "@/components/products/ProductTable";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";


const EditProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product as Product;
  const { t } = useTranslation();


  const [formData, setFormData] = useState({
    id: product?.id || "",
    name: product?.name || "",
    description: product?.description || "",
    quantity: product?.quantity?.toString() || "",
    category: product?.category || "",
    price: product?.price?.toString() || "",
    colors: product?.colors || [],
    disabled: product?.disabled || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Producto actualizado:", formData);
    toast.success("Producto actualizado correctamente");
    // Aquí iría la lógica de actualización
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-accent/10 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">{t('product.notFound')}</p>
            <Button onClick={() => navigate("/modificar-productos")}>
              {t('product.back')}
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
              {t('product.titleEdit')}: {product.id}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="id">{t('product.id')}</Label>
                  <Input
                    id="id"
                    value={formData.id}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">{t('product.category')} *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cuidado del Cabello">Cuidado del Cabello</SelectItem>
                      <SelectItem value="Cuidado de Barba">Cuidado de Barba</SelectItem>
                      <SelectItem value="Afeitado">Afeitado</SelectItem>
                      <SelectItem value="Herramientas">Herramientas</SelectItem>
                      <SelectItem value="Accesorios">Accesorios</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">{t('product.name')} *</Label>
                <Input
                  id="name"
                  placeholder="Nombre del producto"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{t('product.description')} *</Label>
                <Textarea
                  id="description"
                  placeholder="Descripción detallada del producto"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>{t('product.photos')}</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-1">
                    {t('product.uploadText')}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t('product.uploadFormats')}
                  </p>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

             


                <div className="grid md:grid-cols-2 gap-6">

                  {/* Colores disponibles (lado izquierdo) */}
                  <div className="space-y-2">
                    <Label>{t('product.colors')}</Label>

                    <div className="flex gap-3 flex-wrap items-center">
                      {formData.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className="w-12 h-12 rounded-full border-2 border-border shadow-sm"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}

                      <div className="flex gap-2">
                        <Input
                          type="color"
                          className="w-12 h-12 cursor-pointer"
                          title="Seleccionar color"
                        />
                        <Button type="button" variant="outline" size="sm">
                          + {t('product.addColor')}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Deshabilitar producto (lado derecho) */}
                  <div className="space-y-2">
                    <Label htmlFor="disabled">{t('product.disable')}</Label>

                    <div
                      onClick={() =>
                        setFormData({ ...formData, disabled: !formData.disabled })
                      }
                      className="w-6 h-6 border-2 border-primary rounded cursor-pointer flex items-center justify-center"
                    >
                      {formData.disabled && (
                        <span className="font-bold text-primary">X</span>
                      )}
                    </div>
                  </div>

                </div>



              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="quantity">{t('product.quantity')} *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="0"
                    min="0"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    required
                  />
                </div>



                <div className="space-y-2">
                  <Label htmlFor="price">{t('product.price')} *</Label>
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
                <Button type="submit" className="flex-1" size="lg">
                  <Save className="w-4 h-4 mr-2" />
                  {t('product.save')}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/modificar-productos")}
                  size="lg"
                >
                  {t('product.cancel')}
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

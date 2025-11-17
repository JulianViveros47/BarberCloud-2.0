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
import { ArrowLeft, Upload, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ProductTable, Product } from "@/components/products/ProductTable";
import { useTranslation } from "react-i18next";

// Mock data
const mockProducts: Product[] = [
  {
    id: "P001",
    name: "Cera para Cabello Premium",
    description: "Cera de alta fijación para todo tipo de cabello",
    images: ["/placeholder.svg"],
    colors: ["#000000", "#8B4513", "#FFD700"],
    quantity: 50,
    category: "Cuidado del Cabello",
    price: 15.99,
  },
  {
    id: "P002",
    name: "Aceite para Barba",
    description: "Aceite nutritivo con aroma a cedro",
    images: ["/placeholder.svg"],
    colors: ["#8B4513", "#654321"],
    quantity: 30,
    category: "Cuidado de Barba",
    price: 12.50,
  },
  {
    id: "P003",
    name: "Gel de Afeitar Suave",
    description: "Gel suavizante para afeitado perfecto",
    images: ["/placeholder.svg"],
    colors: ["#4169E1", "#87CEEB"],
    quantity: 75,
    category: "Afeitado",
    price: 8.99,
  },
  {
    id: "P004",
    name: "Pomada Brillante",
    description: "Pomada con acabado brillante de larga duración",
    images: ["/placeholder.svg"],
    colors: ["#FFD700", "#FFA500"],
    quantity: 40,
    category: "Cuidado del Cabello",
    price: 18.99,
  },
  {
    id: "P005",
    name: "Champú Profesional",
    description: "Champú fortificante con vitamina E",
    images: ["/placeholder.svg"],
    colors: ["#00CED1", "#20B2AA"],
    quantity: 100,
    category: "Cuidado del Cabello",
    price: 14.99,
  },
];

const RegisterProducts = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    quantity: "",
    category: "",
    price: "",
  });

  const totalPages = Math.ceil(mockProducts.length / itemsPerPage);
  const paginatedProducts = mockProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    // Aquí iría la lógica de guardado
  };

  const { t } = useTranslation();

  return (
  <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
    <div className="container mx-auto px-4 py-6 sm:py-8">

      {/* GRID PRINCIPAL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

        {/* FORMULARIO */}
        <Card className="shadow-[var(--shadow-strong)]">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
              <Plus className="w-6 h-6 text-primary" />
              {t("product.titleRegister")}
            </CardTitle>
          </CardHeader>
          <CardContent>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* ID */}
              <div className="space-y-2">
                <Label htmlFor="id">{t("product.id")} *</Label>
                <Input
                  id="id"
                  placeholder="P001"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  required
                />
              </div>

              {/* Nombre */}
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

              {/* Descripción */}
              <div className="space-y-2">
                <Label htmlFor="description">{t("product.description")} *</Label>
                <Textarea
                  id="description"
                  placeholder="Descripción detallada"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
                />
              </div>

              {/* Fotos */}
              <div className="space-y-2">
                <Label htmlFor="photos">{t("product.photos")}</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Arrastra y suelta imágenes aquí o haz clic
                  </p>
                  <Input id="photos" type="file" multiple accept="image/*" className="hidden" />
                </div>
              </div>

              {/* Colores */}
              <div className="space-y-2">
                <Label htmlFor="colors">{t("product.colors")}</Label>
                <div className="flex gap-2 flex-wrap">
                  <Input type="color" className="w-20 h-10 cursor-pointer" />
                  <Button type="button" variant="outline" size="sm">
                    + {t("product.addColor")}
                  </Button>
                </div>
              </div>

              {/* Cantidad y Precio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">{t("product.quantity")} *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="0"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">{t("product.price")} *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Categoría */}
              <div className="space-y-2">
                <Label>{t("product.category")} *</Label>
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

              <Button type="submit" className="w-full" size="lg">
                {t("product.registerProduct")}
              </Button>
            </form>

          </CardContent>
        </Card>

        {/* TABLA */}
        <Card className="shadow-[var(--shadow-strong)]">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">{t("product.titleRegistered")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <ProductTable
                products={paginatedProducts}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  </div>
);

};

export default RegisterProducts;

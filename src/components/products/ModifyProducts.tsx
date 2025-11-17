import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
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
    disabled: true,
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
    disabled: true,
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
    disabled: false,
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
    disabled: false,
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
    disabled: true,
  },
  {
    id: "P006",
    name: "Bálsamo After Shave",
    description: "Bálsamo calmante post-afeitado",
    images: ["/placeholder.svg"],
    colors: ["#E0FFFF", "#B0E0E6"],
    quantity: 60,
    category: "Afeitado",
    price: 11.99,
    disabled: true,
  },
  {
    id: "P007",
    name: "Cepillo de Barba",
    description: "Cepillo de cerdas naturales para barba",
    images: ["/placeholder.svg"],
    colors: ["#8B4513", "#654321", "#D2691E"],
    quantity: 25,
    category: "Herramientas",
    price: 19.99,
    disabled: true,
  },
  {
    id: "P008",
    name: "Tijeras Profesionales",
    description: "Tijeras de acero inoxidable para corte preciso",
    images: ["/placeholder.svg"],
    colors: ["#C0C0C0", "#808080"],
    quantity: 15,
    category: "Herramientas",
    price: 29.99,
    disabled: true,
  },
  {
    id: "P009",
    name: "Loción Tónica",
    description: "Loción revitalizante para cuero cabelludo",
    images: ["/placeholder.svg"],
    colors: ["#98FB98", "#90EE90"],
    quantity: 45,
    category: "Cuidado del Cabello",
    price: 13.50,
    disabled: true,
  },
  {
    id: "P010",
    name: "Navaja de Afeitar Clásica",
    description: "Navaja tradicional con mango de madera",
    images: ["/placeholder.svg"],
    colors: ["#8B4513", "#A0522D"],
    quantity: 20,
    category: "Herramientas",
    price: 45.00,
    disabled: true,
  },
  {
    id: "P011",
    name: "Acondicionador Nutritivo",
    description: "Acondicionador con aceite de argán",
    images: ["/placeholder.svg"],
    colors: ["#FFE4B5", "#FFDAB9"],
    quantity: 80,
    category: "Cuidado del Cabello",
    price: 16.99,
    disabled: true,
  },
  {
    id: "P012",
    name: "Kit de Afeitado Completo",
    description: "Set completo con brocha, jabón y tazón",
    images: ["/placeholder.svg"],
    colors: ["#000000", "#FFFFFF"],
    quantity: 10,
    category: "Afeitado",
    price: 59.99,
    disabled: true,
  },
];

const ModifyProducts = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { t } = useTranslation();

  const totalPages = Math.ceil(mockProducts.length / itemsPerPage);
  const paginatedProducts = mockProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (product: Product) => {
    navigate(`/home-product-edit/${product.id}`, { state: { product } });


  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
      <div className="container mx-auto px-4 py-8">

        <Card className="shadow-[var(--shadow-strong)]">
          <CardHeader>
            <CardTitle className="text-3xl">{t('product.titleModify')}</CardTitle>
            <p className="text-muted-foreground mt-2">
              {t('product.selectProduct')}
            </p>
          </CardHeader>
          <CardContent>
            <ProductTable
              products={paginatedProducts}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              onEdit={handleEdit}
              showEditButton
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModifyProducts;

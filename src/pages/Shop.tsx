import { useState } from "react";
import { ShoppingCart, MapPin, Search, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/shop/ProductCard";
import ProductDetailModal from "@/components/shop/ProductDetailModal";
import Cart from "@/components/shop/Cart";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/contexts/CartContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Mock data - En producción vendría de la base de datos
const barbershopInfo = {
  logo: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop",
  name: "The Modern Barber",
  address: "Calle 123 #45-67, Bogotá, Colombia",
};

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Pomada Premium",
    price: 45000,
    images: [
      "https://images.unsplash.com/photo-1621607512214-68297480165e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop",
    ],
    colors: ["Negro", "Azul", "Rojo"],
    description: "Pomada de fijación fuerte con acabado mate. Perfecta para peinados modernos y duraderos.",
    category: "Productos para el cabello",
  },
  {
    id: "2",
    name: "Aceite para Barba",
    price: 38000,
    images: [
      "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1574937086276-854a5ff9178d?w=500&h=500&fit=crop",
    ],
    colors: ["Natural"],
    description: "Aceite orgánico que hidrata, suaviza y da brillo a tu barba. Aroma a madera de cedro.",
    category: "Cuidado de barba",
  },
  {
    id: "3",
    name: "Cera Moldeadora",
    price: 42000,
    images: [
      "https://images.unsplash.com/photo-1600185366316-3f4b8f4b8f4b?w=500&h=500&fit=crop",
    ],
    colors: ["Transparente", "Natural"],
    description: "Cera flexible para dar forma y textura. Control medio con acabado natural.",
    category: "Productos para el cabello",
  },
  {
    id: "4",
    name: "Shampoo Profesional",
    price: 35000,
    images: [
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=500&h=500&fit=crop",
    ],
    colors: ["Verde", "Azul"],
    description: "Shampoo profesional con ingredientes naturales. Limpia sin resecar el cuero cabelludo.",
    category: "Cuidado capilar",
  },
  {
    id: "5",
    name: "Gel Fijador Extra Fuerte",
    price: 32000,
    images: [
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=500&h=500&fit=crop",
    ],
    colors: ["Transparente"],
    description: "Gel de fijación extrema. Ideal para peinados que requieren máximo control todo el día.",
    category: "Productos para el cabello",
  },
  {
    id: "6",
    name: "Bálsamo After Shave",
    price: 40000,
    images: [
      "https://images.unsplash.com/photo-1563630268214-1bb93e6b76de?w=500&h=500&fit=crop",
    ],
    colors: ["Blanco"],
    description: "Bálsamo calmante post-afeitado. Reduce irritación y deja la piel suave e hidratada.",
    category: "Afeitado",
  },
];

const Shop = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems } = useCart();
  const { t } = useTranslation();

  // Dividir productos en 2 grupos para los 2 carousels
  const firstRowProducts = mockProducts.slice(0, 3);
  const secondRowProducts = mockProducts.slice(3, 6);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">

  {/* Header */}
  <div className="relative flex flex-col md:flex-row items-center md:items-start px-4 md:px-20 py-6 gap-4 md:gap-0">
    {/* Izquierda: Logo + info */}
    <div className="flex items-center gap-4 w-full md:w-auto">
      <img
        src={barbershopInfo.logo}
        alt={barbershopInfo.name}
        className="w-12 h-12 rounded-full object-cover border-2 border-primary shadow-soft"
      />
      <div>
        <h1 className="text-xl font-bold text-foreground">{barbershopInfo.name}</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{barbershopInfo.address}</span>
        </div>
      </div>
    </div>

    {/* Buscador centrado */}
    <div className="w-full md:absolute md:left-1/2 md:transform md:-translate-x-1/2 mt-4 md:mt-0 max-w-xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder={t("shop.search")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-14 text-lg border-2 focus-visible:border-primary transition-colors w-full"
        />
      </div>
    </div>
  </div>

  {/* Productos */}
  <div className="container mx-auto px-4 py-8 space-y-12">
    {[firstRowProducts, secondRowProducts].map((products, index) => (
      <div key={index}>
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {products.map(product => (
              <CarouselItem
                key={product.id}
                className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/3"
              >
                <ProductCard product={product} onViewDetails={setSelectedProduct} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 transform -translate-y-1/2 left-2 md:left-0 md:-translate-x-10 z-10" />
          <CarouselNext className="absolute top-1/2 transform -translate-y-1/2 right-2 md:right-0 md:translate-x-10 z-10" />
        </Carousel>
      </div>
    ))}
  </div>

  {/* Modal de detalles del producto */}
  {selectedProduct && (
    <ProductDetailModal
      product={selectedProduct}
      open={!!selectedProduct}
      onClose={() => setSelectedProduct(null)}
    />
  )}

  {/* Carrito */}
  <Cart open={isCartOpen} onClose={() => setIsCartOpen(false)} />
</div>


    
  );
};

export default Shop;

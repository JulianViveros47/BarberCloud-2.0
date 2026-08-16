import { useEffect, useMemo, useState } from "react";
import { MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/shop/ProductCard";
import ProductDetailModal from "@/components/shop/ProductDetailModal";
import { Product } from "@/contexts/CartContext";
import { useTranslation } from "react-i18next";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useBarberShops } from "@/hooks/useBarberShops";
import { useProducts } from "@/hooks/useProducts";

const SELECTED_BARBERSHOP_KEY = "barbercloud_selected_barbershop_id";

const fallbackImages = [
  "https://images.unsplash.com/photo-1621607512214-68297480165e?w=500&h=500&fit=crop",
  "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=500&h=500&fit=crop",
  "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=500&h=500&fit=crop",
  "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=500&h=500&fit=crop",
];

const Shop = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBarberShopId, setSelectedBarberShopId] = useState(
    () => localStorage.getItem(SELECTED_BARBERSHOP_KEY) || "",
  );
  const { t } = useTranslation();
  const barberShopsQuery = useBarberShops();
  const productsQuery = useProducts(selectedBarberShopId || undefined);

  const activeBarberShops = useMemo(
    () => (barberShopsQuery.data || []).filter((shop) => shop.active),
    [barberShopsQuery.data],
  );

  useEffect(() => {
    if (!selectedBarberShopId && activeBarberShops.length > 0) {
      setSelectedBarberShopId(activeBarberShops[0].id);
      localStorage.setItem(SELECTED_BARBERSHOP_KEY, activeBarberShops[0].id);
    }
  }, [activeBarberShops, selectedBarberShopId]);

  const selectedBarberShop = activeBarberShops.find((shop) => shop.id === selectedBarberShopId);

  const products = useMemo<Product[]>(
    () =>
      (productsQuery.data || [])
        .filter((product) => product.active)
        .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((product, index) => ({
          id: product.id,
          barberShopId: product.barberShopId,
          name: product.name,
          price: product.priceInCents / 100,
          images: [fallbackImages[index % fallbackImages.length]],
          colors: ["Unico"],
          description: product.description || "Producto disponible en la barberia.",
          stock: product.stock,
        })),
    [productsQuery.data, searchQuery],
  );

  const midpoint = Math.ceil(products.length / 2);
  const productRows = products.length > 0 ? [products.slice(0, midpoint), products.slice(midpoint)] : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <div className="relative flex flex-col md:flex-row items-center md:items-start px-4 md:px-20 py-6 gap-4 md:gap-0">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <img
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop"
            alt={selectedBarberShop?.name || "Barberia"}
            className="w-12 h-12 rounded-full object-cover border-2 border-primary shadow-soft"
          />
          <div>
            <p className="text-sm font-medium text-primary">Nueva venta</p>
            <h1 className="text-xl font-bold text-foreground">
              {selectedBarberShop?.name || "BarberCloud"}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Agrega productos al carrito para registrar la venta</span>
            </div>
          </div>
        </div>

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

      <div className="container mx-auto px-4 py-8 space-y-12">
        {barberShopsQuery.isLoading || productsQuery.isLoading ? (
          <p className="text-muted-foreground">Cargando productos...</p>
        ) : products.length === 0 ? (
          <div className="rounded-md border p-8 text-center text-muted-foreground">
            No hay productos disponibles para vender.
          </div>
        ) : (
          productRows.map((row, index) => (
            row.length > 0 && (
              <div key={index}>
                <Carousel opts={{ align: "start", loop: row.length > 1 }} className="w-full">
                  <CarouselContent className="-ml-4">
                    {row.map((product) => (
                      <CarouselItem
                        key={product.id}
                        className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/3"
                      >
                        <ProductCard product={product} onViewDetails={setSelectedProduct} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {row.length > 1 && (
                    <>
                      <CarouselPrevious className="absolute top-1/2 transform -translate-y-1/2 left-2 md:left-0 md:-translate-x-10 z-10" />
                      <CarouselNext className="absolute top-1/2 transform -translate-y-1/2 right-2 md:right-0 md:translate-x-10 z-10" />
                    </>
                  )}
                </Carousel>
              </div>
            )
          ))
        )}
      </div>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          open={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Shop;

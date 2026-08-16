import { useState } from "react";
import { X, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/contexts/CartContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTranslation } from "react-i18next";

interface ProductDetailModalProps {
  product: Product;
  open: boolean;
  onClose: () => void;
}



const ProductDetailModal = ({ product, open, onClose }: ProductDetailModalProps) => {
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
  const { addToCart } = useCart();
  const { t } = useTranslation();
  const isLowStock = typeof product.stock === "number" && product.stock > 0 && product.stock <= 5;

  const handleAddToCart = () => {
    addToCart(product, selectedColor);
    toast.success(`${product.name} (${selectedColor}) ${t("shop.addedToCart")}`);
    onClose();
  };

  
  

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Carrusel de imágenes */}
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-square rounded-lg overflow-hidden border-2 border-border">
                      <img
                        src={image}
                        alt={`${product.name} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {product.images.length > 1 && (
                <>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </>
              )}
            </Carousel>
          </div>

          {/* Detalles del producto */}
          <div className="flex flex-col gap-4">
            {product.category && (
              <Badge variant="secondary" className="w-fit">
                {product.category}
              </Badge>
            )}
            {isLowStock && (
              <Badge className="w-fit bg-amber-500 text-white hover:bg-amber-500">
                Stock bajo
              </Badge>
            )}

            <div>
              <p className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                ${product.price.toLocaleString()}
              </p>
              {typeof product.stock === "number" && (
                <p className="text-sm text-muted-foreground">{product.stock} disponible(s)</p>
              )}
            </div>

            <div>
              <h3 className="font-semibold mb-2">{t("shop.description")}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">{t("shop.colorsAvailable")}</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedColor(color)}
                    className={
                      selectedColor === color
                        ? "bg-gradient-primary hover:opacity-90"
                        : ""
                    }
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-auto pt-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-primary hover:opacity-90 shadow-soft"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {t("shop.addToCart")}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;

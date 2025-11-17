import { ShoppingCart, Eye } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/contexts/CartContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}


const ProductCard = ({ product, onViewDetails }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { t } = useTranslation();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} ${t("shop.addedToCart")}`);
  };
  

  return (
    <Card
      className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-strong hover:-translate-y-1 border-2 hover:border-primary/50"
      onClick={() => onViewDetails(product)}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(product);
          }}
        >
          <Eye className="w-4 h-4" />
        </Button>
      </div>

      <CardContent className="p-4">
        {product.category && (
          <Badge variant="secondary" className="mb-2">
            {product.category}
          </Badge>
        )}
        <h3 className="font-bold text-lg mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
          {product.description}
        </p>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground">{t("shop.colors")}:</span>
          <div className="flex gap-1">
            {product.colors.slice(0, 3).map((color, idx) => (
              <div
                key={idx}
                className="w-4 h-4 rounded-full border border-border bg-secondary"
                title={color}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-xs text-muted-foreground">+{product.colors.length - 3}</span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            ${product.price.toLocaleString()}
          </p>
        </div>
        <Button
          onClick={handleAddToCart}
          className="bg-gradient-primary hover:opacity-90 shadow-soft"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {t("shop.add")}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

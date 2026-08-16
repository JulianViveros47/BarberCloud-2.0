import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useCreateSale } from "@/hooks/useSales";

interface CartProps {
  open: boolean;
  onClose: () => void;
}

const Cart = ({ open, onClose }: CartProps) => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const createSaleMutation = useCreateSale();
  const { t } = useTranslation();

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("El carrito esta vacio");
      return;
    }

    const barberShopId = items[0].barberShopId;
    if (!barberShopId) {
      toast.error("No se pudo identificar la barberia de la venta");
      return;
    }

    try {
      await createSaleMutation.mutateAsync({
        barberShopId,
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      });
      clearCart();
      onClose();
      toast.success("Venta registrada correctamente");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo registrar la venta");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-2xl text-primary">
            <ShoppingBag className="w-6 h-6 text-black dark:text-white" />
            {t("shop.cart")}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <ShoppingBag className="w-24 h-24 text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t("shop.cartEmpty")}</h3>
            <p className="text-muted-foreground mb-6">{t("shop.addProducts")}</p>
            <Button onClick={onClose} variant="outline">
              {t("shop.continueShopping")}
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <Card key={`${item.id}-${item.selectedColor}`} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md border border-border"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold line-clamp-1">{item.name}</h4>
                        {item.selectedColor && (
                          <p className="text-sm text-muted-foreground">
                            Color: {item.selectedColor}
                          </p>
                        )}
                        <p className="text-lg font-bold text-primary mt-1">
                          ${item.price.toLocaleString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2 border border-border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="font-bold">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-4">
              <Card className="bg-secondary/50">
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("shop.subtotal")}</span>
                    <span className="font-medium">${totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("shop.shipping")}</span>
                    <span className="font-medium text-primary">{t("shop.free")}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>{t("shop.total")}</span>
                    <span className="bg-gradient-primary bg-clip-text text-transparent">
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={handleCheckout}
                className="w-full bg-gradient-primary hover:opacity-90 shadow-soft"
                size="lg"
                disabled={createSaleMutation.isPending}
              >
                {createSaleMutation.isPending ? "Registrando..." : t("shop.pay")}
              </Button>

              <Button onClick={clearCart} variant="outline" className="w-full" size="sm">
                {t("shop.emptyCart")}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;

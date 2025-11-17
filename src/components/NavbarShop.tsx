import { useState } from "react";
import { Scissors, Filter, User, Menu, X, ShoppingCart, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Cart from "@/components/shop/Cart";
import { useCart } from "@/contexts/CartContext"; // ✅ Contexto global del carrito
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const NavbarAdminBarberShop = () => {
  const { t } = useTranslation(undefined, { i18n });
  const [filterOpen, setFilterOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ✅ Usamos el contexto global del carrito
  const { totalItems, isCartOpen, setIsCartOpen } = useCart();
    const navigate = useNavigate();

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo BarberCloud */}
        <div className="flex items-center gap-2">
           <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition ">
            <ArrowLeft className="h-5 w-5 text-secondary dark:text-white" />
          </button>
          
                   <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
                                         <Scissors className="h-6 w-6 text-primary" />
                                         <span className="text-secondary dark:text-white">Barber</span>
                                         <span className="text-primary">Cloud</span>
                                       </Link>
                   
        </div>



        {/* Controles derecha (solo desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {/* ✅ Botón del carrito */}
          <Button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-gradient-primary hover:opacity-90 shadow-soft"
            size="lg"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <Badge
                variant="destructive"
                className="absolute top-0 right-0 h-6 w-6 rounded-full p-0 flex items-center justify-center animate-scale-in translate-x-1/2 -translate-y-1/2"
              >
                {totalItems}
              </Badge>
            )}
          </Button>

          <ThemeToggle />
          <LanguageToggle />
          <Button variant="ghost" size="icon" onClick={() => setModalOpen(true)}>
            <User className="h-6 w-6" />
          </Button>
        </div>

        {/* Menú móvil */}
        <div className="flex md:hidden items-center gap-2 w-full justify-end">

          <Button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-gradient-primary hover:opacity-90 shadow-soft p-2"
            size="sm"
          >
            <ShoppingCart className="w-8 h-8" />
            {totalItems > 0 && (
              <Badge
                variant="destructive"
                className="absolute top-0 right-0 h-8 w-8 rounded-full p-0 flex items-center justify-center text-xs animate-scale-in translate-x-1/2 -translate-y-1/2"
              >
                {totalItems}
              </Badge>
            )}
          </Button>

          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-2 py-4 space-y-4 border-t border-border animate-fade-in">
          <div className="flex flex-col items-center gap-4">
            <ThemeToggle />
            <LanguageToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsMenuOpen(false);
                setModalOpen(true);
              }}
            >
              <User className="h-6 w-6" />
            </Button>
          </div>
        </div>
      )}

      {/* Modal perfil */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-sm text-center">
          <DialogHeader>
            <DialogTitle>{t("navCustomer.profileTitle")}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-3">
            <img src="https://via.placeholder.com/100" alt="profile" className="w-20 h-20 rounded-full border" />
            <p className="font-semibold text-lg">Julian</p>
            <p className="text-sm text-muted-foreground">julian@example.com</p>
            <Button variant="destructive" className="mt-3">
              {t("navCustomer.logout")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ✅ Carrito compartido */}
      <Cart open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
};

export default NavbarAdminBarberShop;

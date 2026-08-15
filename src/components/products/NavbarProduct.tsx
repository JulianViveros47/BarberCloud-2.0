import { useState } from "react";
import { Scissors, Filter, User, Menu, X , ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n"; // ✅ Instancia local
import { Link } from "react-router-dom";
import { UserProfileDialog } from "@/components/UserProfileDialog";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";


const NavbarProduct = () => {
  const { t } = useTranslation(undefined, { i18n: i18n });
  const [filterOpen, setFilterOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // ✅ Estado menú hamburguesa

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* Logo BarberCloud */}
        <div className="flex items-center gap-2">
           <Link to="/home-admin-barber" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition ">
            <ArrowLeft className="h-5 w-5 text-secondary dark:text-white" />
          </Link>
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <Scissors className="h-6 w-6 text-primary" />
            <span className="text-secondary dark:text-white">Barber</span>
            <span className="text-primary">Cloud</span>
          </Link>
        </div>

        {/* Buscador y filtro (solo desktop) */}
        <div className="hidden md:flex items-center gap-3 w-full max-w-md">
          
          <Popover open={filterOpen} onOpenChange={setFilterOpen}>
            
            <PopoverContent align="end" className="w-56 space-y-2">
              <div>
                <label className="text-sm font-medium">{t("navCustomer.department")}</label>
                <Input placeholder={t("navCustomer.selectDepartment")} />
              </div>
              <div>
                <label className="text-sm font-medium">{t("navCustomer.city")}</label>
                <Input placeholder={t("navCustomer.selectCity")} />
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Controles derecha (solo desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <LanguageToggle />
          <Button variant="ghost" size="icon" onClick={() => setModalOpen(true)}>
            <User className="h-6 w-6" />
          </Button>
        </div>

        {/* ✅ Menú hamburguesa y buscador (solo móvil) */}
        <div className="flex md:hidden items-center gap-2 w-full justify-end">
          {/* Barra de búsqueda móvil */}
          

          {/* Botón menú hamburguesa */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* ✅ Mobile Menu */}
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

      <UserProfileDialog open={modalOpen} onOpenChange={setModalOpen} />


    </nav>
  );
};

export default NavbarProduct;

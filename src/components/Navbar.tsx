import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTranslation } from "react-i18next";
import { BrandLogo } from "@/components/BrandLogo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <BrandLogo />
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#inicio" className="text-foreground hover:text-primary transition-colors">
              {t('nav.home')}
            </a>
            <a href="#caracteristicas" className="text-foreground hover:text-primary transition-colors">
              {t('nav.features')}
            </a>
            <a href="#contacto" className="text-foreground hover:text-primary transition-colors">
              {t('nav.contact')}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageToggle />
            
            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  {t('nav.login')}
                </Button>
              </Link>
              <Link to="/registro">
                <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-soft">
                  {t('nav.register')}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 space-y-4 animate-fade-in border-t border-border">
            <a 
              href="#inicio" 
              className="block text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.home')}
            </a>
            <a 
              href="#caracteristicas" 
              className="block text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.features')}
            </a>
            <a 
              href="#contacto" 
              className="block text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.contact')}
            </a>
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full text-foreground hover:text-primary">
                {t('nav.login')}
              </Button>
            </Link>
            <Link to="/registro" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-soft">
                {t('nav.register')}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

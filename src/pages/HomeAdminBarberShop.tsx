
import NavbarAdminBarberShop from "@/components/NavbarShop";
import Shop from "@/pages/Shop";
import Footer from "@/components/Footer";
import { CartProvider } from "@/contexts/CartContext";

const HomeAdminBarberShop = () => {
  return (
    <CartProvider>
      <div className="min-h-screen">
        <NavbarAdminBarberShop />
        <Shop />
        <Footer />
      </div>
    </CartProvider>
  );
};

export default HomeAdminBarberShop;
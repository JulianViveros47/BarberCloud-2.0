
import NavbarCustomerShop from "@/components/NavbarShop";
import Shop from "@/pages/Shop";
import Footer from "@/components/Footer";
import { CartProvider } from "@/contexts/CartContext";

const HomeCustomerShop = () => {
  return (
    <CartProvider>
      <div className="min-h-screen">
        <NavbarCustomerShop />
        <Shop />
        <Footer />
      </div>
    </CartProvider>
  );
};

export default HomeCustomerShop;
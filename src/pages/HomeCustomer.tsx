/** Home donde aparecen todas las barberias*/

import NavbarCustomer from "@/components/NavbarCustomer";
import HeroCustomer from "@/components/HeroCustomer";
import Footer from "@/components/Footer";

const HomeCustomer = () => {
  return (
    <div className="min-h-screen">
      <NavbarCustomer />

      <HeroCustomer />

      <Footer />
    </div>
  );
};

export default HomeCustomer;


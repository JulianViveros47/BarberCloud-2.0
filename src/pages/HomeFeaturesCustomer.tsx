/** Home de cada barberia en donde se elige Tienda, Agendamiento de citas, etc*/

import NavbarCustomerFeature from "@/components/NavbarCustomerFeature";
import Footer from "@/components/Footer";
import FeaturesCustomer from "@/components/FeaturesCustomer";

const HomeFeaturesCustomer = () => {
  return (
    <div className="min-h-screen">
      <NavbarCustomerFeature />

      <FeaturesCustomer />

      <Footer />
    </div>
  );
};

export default HomeFeaturesCustomer;
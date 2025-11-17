import NavbarAdminBarber from "@/components/NavbarAdminBarber";
import FeaturesAdminBarber from "@/components/FeaturesAdminBarber";
import Footer from "@/components/Footer";

const HomeAdminBarber = () => {
  return (
    <div className="min-h-screen">
      <NavbarAdminBarber />

      <FeaturesAdminBarber />

      <Footer />
    </div>
  );
};

export default HomeAdminBarber;
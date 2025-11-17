import NavbarProduct from "@/components/products/NavbarProduct";  
  
import Footer from "@/components/Footer";
import EditBarbershopInfo from "@/components/register/EditBarbershopInfo";

const HomeProductModify = () => {
  return (
    <div className="min-h-screen">
      <NavbarProduct />

      <EditBarbershopInfo />

      <Footer />
    </div>
  );
};

export default HomeProductModify;
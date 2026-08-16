import NavbarProduct from "@/components/products/NavbarProduct";
import RegisterServices from "@/components/services/RegisterServices";

const HomeService = () => {
  return (
    <div className="min-h-screen">
      <NavbarProduct />
      <RegisterServices />
    </div>
  );
};

export default HomeService;

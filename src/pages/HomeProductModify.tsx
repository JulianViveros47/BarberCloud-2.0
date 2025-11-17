import NavbarProduct from "@/components/products/NavbarProduct";
import ModifyProducts from "@/components/products/ModifyProducts";
import Footer from "@/components/Footer";

const HomeProductModify = () => {
  return (
    <div className="min-h-screen">
      <NavbarProduct />

      <ModifyProducts />

      <Footer />
    </div>
  );
};

export default HomeProductModify;
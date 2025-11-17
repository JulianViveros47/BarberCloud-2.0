import NavbarProduct from "@/components/products/NavbarProduct";
import RegisterProducts from "@/components/products/RegisterProducts";
import Footer from "@/components/Footer";

const HomeProduct = () => {
  return (
    <div className="min-h-screen">
      <NavbarProduct />

      <RegisterProducts />

      <Footer />
    </div>
  );
};

export default HomeProduct;
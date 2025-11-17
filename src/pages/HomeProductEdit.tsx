import NavbarEditProduct from "@/components/products/NavbarEditProduct";
import EditProduct from "@/components/products/EditProduct";
import Footer from "@/components/Footer";

const HomeProductEdit = () => {
  return (
    <div className="min-h-screen">
      <NavbarEditProduct />

      <EditProduct />

      <Footer />
    </div>
  );
};

export default HomeProductEdit;
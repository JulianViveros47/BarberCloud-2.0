import NavbarProduct from "@/components/products/NavbarProduct";
import ReviewsPage from "@/components/ratings/ReviewsPage";
import Footer from "@/components/Footer";

const RatingsAdminBarber = () => {
  return (
    <div className="min-h-screen">
      <NavbarProduct />

      <ReviewsPage />

      <Footer />
    </div>
  );
};

export default RatingsAdminBarber;
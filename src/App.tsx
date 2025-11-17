import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import HomeCustomer from "./pages/HomeCustomer";
import HomeCustomerShop from "./pages/HomeCustomerShop";
import HomeFeaturesCustomer from "./pages/HomeFeaturesCustomer";
import Ratings from "./pages/Ratings";
import HomeAdminBarber from "./pages/HomeAdminBarber";
import HomeProduct from "./pages/HomeProduct";
import HomeProductModify from "./pages/HomeProductModify";
import HomeProductEdit from "./pages/HomeProductEdit";
import RatingsAdminBarber from "./pages/RatingsAdminBarber";
import HomeAdminBarberShop from "./pages/HomeAdminBarberShop";
import RegisterModify from "./pages/RegisterModify";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/home-customer" element={<HomeCustomer />} />
            <Route path="/shop" element={<HomeCustomerShop />} />
            <Route path="/features-customer" element={<HomeFeaturesCustomer />} />
            <Route path="/ratings" element={<Ratings />} />

            <Route path="/home-admin-barber" element={<HomeAdminBarber />} />
            <Route path="/home-product" element={<HomeProduct />} />
            <Route path="/home-product-modify" element={<HomeProductModify />} />
            <Route path="/home-product-edit/:productId" element={<HomeProductEdit />} />
            <Route path="/ratings-admin-barber" element={<RatingsAdminBarber />} />
            <Route path="/shop-admin-barber" element={<HomeAdminBarberShop />} />

            <Route path="/register-modify" element={<RegisterModify />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
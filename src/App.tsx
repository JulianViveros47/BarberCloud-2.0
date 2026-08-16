import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { isAuthenticated } from "@/hooks/useAuth";
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
import HomeService from "./pages/HomeService";
import HomeServiceModify from "./pages/HomeServiceModify";
import HomeServiceEdit from "./pages/HomeServiceEdit";
import RatingsAdminBarber from "./pages/RatingsAdminBarber";
import HomeAdminBarberShop from "./pages/HomeAdminBarberShop";
import RegisterModify from "./pages/RegisterModify";
import HistoricalSales from "./pages/HistoricalSales";

const queryClient = new QueryClient();

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  return isAuthenticated() ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  );
};

const GuestRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const redirectTo = (location.state as { from?: string } | null)?.from || "/home-admin-barber";

  return isAuthenticated() ? <Navigate to={redirectTo} replace /> : <>{children}</>;
};

const HomeRoute = () => (
  isAuthenticated() ? <Navigate to="/home-admin-barber" replace /> : <Index />
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeRoute />} />
            <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
            <Route path="/registro" element={<Register />} />
            <Route path="/home-customer" element={<HomeCustomer />} />
            <Route path="/shop" element={<HomeCustomerShop />} />
            <Route path="/features-customer" element={<HomeFeaturesCustomer />} />
            <Route path="/ratings" element={<Ratings />} />

            <Route path="/home-admin-barber" element={<PrivateRoute><HomeAdminBarber /></PrivateRoute>} />
            <Route path="/home-product" element={<PrivateRoute><HomeProduct /></PrivateRoute>} />
            <Route path="/home-product-modify" element={<PrivateRoute><HomeProductModify /></PrivateRoute>} />
            <Route path="/home-product-edit/:productId" element={<PrivateRoute><HomeProductEdit /></PrivateRoute>} />
            <Route path="/home-service" element={<PrivateRoute><HomeService /></PrivateRoute>} />
            <Route path="/home-service-modify" element={<PrivateRoute><HomeServiceModify /></PrivateRoute>} />
            <Route path="/home-service-edit/:serviceId" element={<PrivateRoute><HomeServiceEdit /></PrivateRoute>} />
            <Route path="/ratings-admin-barber" element={<PrivateRoute><RatingsAdminBarber /></PrivateRoute>} />
            <Route path="/shop-admin-barber" element={<PrivateRoute><HomeAdminBarberShop /></PrivateRoute>} />
            <Route path="/historical" element={<PrivateRoute><HistoricalSales /></PrivateRoute>} />

            <Route path="/register-modify" element={<PrivateRoute><RegisterModify /></PrivateRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

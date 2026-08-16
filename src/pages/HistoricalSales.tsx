import NavbarProduct from "@/components/products/NavbarProduct";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const HistoricalSales = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
      <NavbarProduct />
      <main className="container mx-auto px-4 py-8">
        <Card className="shadow-[var(--shadow-strong)]">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-2">
              <TrendingUp className="w-7 h-7 text-primary" />
              Historial de ventas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <ClipboardList className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold">Aun no hay ventas registradas.</h2>
              <p className="mt-2 text-muted-foreground">
                Cuando empieces a registrar ventas, apareceran en este historial.
              </p>
              <Button asChild className="mt-6">
                <Link to="/home-admin-barber">Volver al panel</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default HistoricalSales;

import { useEffect, useMemo, useState } from "react";
import NavbarProduct from "@/components/products/NavbarProduct";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useBarberShops } from "@/hooks/useBarberShops";
import { useSalesByBarberShop } from "@/hooks/useSales";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SELECTED_BARBERSHOP_KEY = "barbercloud_selected_barbershop_id";

const formatPrice = (priceInCents: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 2,
  }).format(priceInCents / 100);

const HistoricalSales = () => {
  const [selectedBarberShopId, setSelectedBarberShopId] = useState(
    () => localStorage.getItem(SELECTED_BARBERSHOP_KEY) || "",
  );
  const barberShopsQuery = useBarberShops();
  const salesQuery = useSalesByBarberShop(selectedBarberShopId || undefined);

  const activeBarberShops = useMemo(
    () => (barberShopsQuery.data || []).filter((shop) => shop.active),
    [barberShopsQuery.data],
  );

  useEffect(() => {
    if (!selectedBarberShopId && activeBarberShops.length > 0) {
      setSelectedBarberShopId(activeBarberShops[0].id);
      localStorage.setItem(SELECTED_BARBERSHOP_KEY, activeBarberShops[0].id);
    }
  }, [activeBarberShops, selectedBarberShopId]);

  const sales = salesQuery.data || [];
  const isLoading = barberShopsQuery.isLoading || salesQuery.isLoading;
  const errorMessage =
    barberShopsQuery.error instanceof Error
      ? barberShopsQuery.error.message
      : salesQuery.error instanceof Error
        ? salesQuery.error.message
        : "";

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
            {isLoading && <p className="text-muted-foreground">Cargando ventas...</p>}
            {errorMessage && <p className="text-destructive">{errorMessage}</p>}

            {!isLoading && !errorMessage && sales.length === 0 && (
              <div className="rounded-md border p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <ClipboardList className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold">Aun no hay ventas registradas.</h2>
                <p className="mt-2 text-muted-foreground">
                  Cuando empieces a registrar ventas, apareceran en este historial.
                </p>
                <Button asChild className="mt-6">
                  <Link to="/shop-admin-barber">Ir a la tienda</Link>
                </Button>
              </div>
            )}

            {!isLoading && !errorMessage && sales.length > 0 && (
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Productos</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sales.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell>{new Date(sale.createdAt).toLocaleString("es-CO")}</TableCell>
                        <TableCell>{sale.customerEmail}</TableCell>
                        <TableCell>
                          {sale.items.map((item) => `${item.productName} x${item.quantity}`).join(", ")}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatPrice(sale.totalInCents)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default HistoricalSales;

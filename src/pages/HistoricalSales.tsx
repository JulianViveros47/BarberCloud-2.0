import { Fragment, useEffect, useMemo, useState } from "react";
import NavbarProduct from "@/components/products/NavbarProduct";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, ClipboardList, TrendingUp } from "lucide-react";
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
  const [expandedSaleId, setExpandedSaleId] = useState<string | null>(null);
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
                      <TableHead className="w-12"></TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Registrada por</TableHead>
                      <TableHead>Productos</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sales.map((sale) => {
                      const isExpanded = expandedSaleId === sale.id;

                      return (
                        <Fragment key={sale.id}>
                          <TableRow>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => setExpandedSaleId(isExpanded ? null : sale.id)}
                                aria-label={isExpanded ? "Ocultar detalle" : "Ver detalle"}
                              >
                                {isExpanded ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </Button>
                            </TableCell>
                            <TableCell>{new Date(sale.createdAt).toLocaleString("es-CO")}</TableCell>
                            <TableCell>
                              <div className="font-medium">{sale.customerName}</div>
                              {sale.customerContact && (
                                <div className="text-xs text-muted-foreground">{sale.customerContact}</div>
                              )}
                            </TableCell>
                            <TableCell>{sale.customerEmail}</TableCell>
                            <TableCell>
                              {sale.items.map((item) => `${item.productName} x${item.quantity}`).join(", ")}
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                              {formatPrice(sale.totalInCents)}
                            </TableCell>
                          </TableRow>
                          {isExpanded && (
                            <TableRow>
                              <TableCell colSpan={6} className="bg-muted/30">
                                <div className="space-y-3 py-2">
                                  <p className="text-sm font-medium">Detalle de la venta</p>
                                  <div className="rounded-md border bg-background">
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Producto</TableHead>
                                          <TableHead className="text-right">Cantidad</TableHead>
                                          <TableHead className="text-right">Precio unitario</TableHead>
                                          <TableHead className="text-right">Subtotal</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {sale.items.map((item) => (
                                          <TableRow key={item.id}>
                                            <TableCell>{item.productName}</TableCell>
                                            <TableCell className="text-right">{item.quantity}</TableCell>
                                            <TableCell className="text-right">
                                              {formatPrice(item.unitPriceInCents)}
                                            </TableCell>
                                            <TableCell className="text-right font-medium">
                                              {formatPrice(item.subtotalInCents)}
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </Fragment>
                      );
                    })}
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

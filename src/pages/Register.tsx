import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scissors, Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { useCreateBarberShop } from "@/hooks/useBarberShops";
import { useRegister } from "@/hooks/useAuth";
import { getAuthToken } from "@/services/api";

const SELECTED_BARBERSHOP_KEY = "barbercloud_selected_barbershop_id";

const Register = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const createBarberShopMutation = useCreateBarberShop();
  const registerMutation = useRegister();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    id: "",
    phone: "",
    password: "",
    shopName: "",
    shopEmail: "",
    descripcion: "",
    department: "",
    city: "",
    address: "",
    primaryColor: "#D4AF37",
    secondaryColor: "#1A1A1A",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = formData.shopName.trim();
    const description = formData.descripcion.trim();
    const phone = formData.phone.trim();
    const email = formData.shopEmail.trim();
    const hasToken = Boolean(getAuthToken());

    if (!name || !phone || !email) {
      toast({
        title: "Datos incompletos",
        description: "Nombre de barberia, telefono y correo son obligatorios.",
        variant: "destructive",
      });
      return;
    }

    if (!hasToken && (!formData.firstName.trim() || !formData.lastName.trim() || !formData.password)) {
      toast({
        title: "Datos incompletos",
        description: "Nombre, apellido y contrasena son obligatorios para crear tu cuenta.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (!hasToken) {
        await registerMutation.mutateAsync({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email,
          password: formData.password,
          role: "BARBERSHOP_ADMIN",
        });
      }

      const barberShop = await createBarberShopMutation.mutateAsync({
        name,
        description,
        phone,
        email,
      });

      localStorage.setItem(SELECTED_BARBERSHOP_KEY, barberShop.id);
      toast({
        title: t("register.title"),
        description: "Barberia registrada correctamente.",
      });
      navigate("/home-product");
    } catch (error) {
      toast({
        title: "No se pudo registrar la barberia",
        description: error instanceof Error ? error.message : "Verifica los datos enviados.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4 py-12">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-3xl font-bold">
            <Scissors className="h-8 w-8 text-primary" />
            <span className="text-secondary dark:text-white">Barber</span>
            <span className="text-primary">Cloud</span>
          </Link>
        </div>

        {/* ✂️ Tarjeta con botón para volver */}
        <Card className="relative border-2 shadow-strong">
          {/* Botón en esquina superior derecha */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="absolute top-3 right-3 rounded-full hover:bg-primary/10"
          >
            <Scissors className="h-5 w-5 text-primary" />
          </Button>

          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">{t("register.title")}</CardTitle>
            <CardDescription className="text-center">{t("register.subtitle")}</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t("register.firstName")}</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{t("register.lastName")}</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="id">{t("register.id")}</Label>
                  <Input
                    id="id"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{t("login.password")}</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required={!getAuthToken()}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("register.phone")}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Barbershop Information */}
              <div className="space-y-2">
                <Label htmlFor="shopName">{t("register.shopName")}</Label>
                <Input
                  id="shopName"
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shopEmail">{t("contact.email")}</Label>
                <Input
                  id="shopEmail"
                  name="shopEmail"
                  type="email"
                  value={formData.shopEmail}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">{t("register.descripcion")}</Label>
                <Input
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">{t("register.logo")}</Label>
                <div className="flex items-center gap-4">
                  <Input id="logo" type="file" accept="image/*" className="flex-1" />
                  <Button type="button" variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Location */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">{t("register.department")}</Label>
                  <Input
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">{t("register.city")}</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">{t("register.address")}</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Color Palette */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">{t("register.primaryColor")}</Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      id="primaryColor"
                      name="primaryColor"
                      type="color"
                      value={formData.primaryColor}
                      onChange={handleChange}
                      className="w-20 h-10"
                    />
                    <Input
                      type="text"
                      value={formData.primaryColor}
                      onChange={handleChange}
                      name="primaryColor"
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">{t("register.secondaryColor")}</Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      id="secondaryColor"
                      name="secondaryColor"
                      type="color"
                      value={formData.secondaryColor}
                      onChange={handleChange}
                      className="w-20 h-10"
                    />
                    <Input
                      type="text"
                      value={formData.secondaryColor}
                      onChange={handleChange}
                      name="secondaryColor"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:opacity-90 text-lg shadow-soft"
                disabled={createBarberShopMutation.isPending || registerMutation.isPending}
              >
                {createBarberShopMutation.isPending || registerMutation.isPending ? "Registrando..." : t("register.submit")}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">{t("register.hasAccount")} </span>
              <Link to="/login" className="text-primary hover:underline font-semibold">
                {t("register.loginLink")}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;

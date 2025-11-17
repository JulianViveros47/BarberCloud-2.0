import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scissors, Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    id: "",
    phone: "",
    shopName: "",
    descripcion: "",
    department: "",
    city: "",
    address: "",
    primaryColor: "#D4AF37",
    secondaryColor: "#1A1A1A",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t("register.title"),
      description: "Funcionalidad en desarrollo. Próximamente disponible.",
    });
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

              <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 text-lg shadow-soft">
                {t("register.submit")}
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

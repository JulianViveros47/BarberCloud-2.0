import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Store } from "lucide-react";
import { useTranslation } from "react-i18next";

const EditBarbershopInfo = () => {
  const { t } = useTranslation();

  // -----------------------------
  // Simulated DB data
  // -----------------------------
  const mockData = {
    firstName: "Carlos",
    lastName: "Ramírez",
    idNumber: "1234567890",
    phone: "3105558899",
    shopName: "Barbería Elite",
    description: "Cortes de alta calidad y estilo moderno",
    logo: "/placeholder.svg",
    department: "Valle del Cauca",
    city: "Cali",
    address: "Cra 15 # 10-25",
    primaryColor: "#0A84FF",
    secondaryColor: "#FFAA00",
  };

  // Editable form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    idNumber: "",
    phone: "",
    shopName: "",
    description: "",
    logo: "",
    department: "",
    city: "",
    address: "",
    primaryColor: "",
    secondaryColor: "",
  });

  // Handle input
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("New Data: ", formData);
  };

  // -----------------------------
  // Helper render function
  // -----------------------------
  const renderField = (label: string, name: string, type = "text") => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Right side first on mobile (blocked fields) */}
        <div className="order-1 md:order-none space-y-2">
          <Label>{t(label)}</Label>
          <Input value={(mockData as any)[name]} disabled />
        </div>

        {/* Editable field */}
        <div className="order-2 md:order-none space-y-2">
          <Label>{t(label)}</Label>
          <Input
            type={type}
            name={name}
            value={(formData as any)[name]}
            onChange={handleChange}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto w-full mb-8">
    <Card className="mt-6 border-2 shadow-strong">
      <CardHeader className="space-y-1 bg-gradient-subtle">
        <div className="flex items-center gap-2">
          <Store className="h-6 w-6 text-primary" />
          <CardTitle className="text-xl font-bold">
            {t("register.infoTitle")}
          </CardTitle>
        </div>
        <CardDescription>
                {t("register.infoDescription")}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Nombres */}
            {renderField("register.firstName", "firstName")}

            {/* Apellidos */}
            {renderField("register.lastName", "lastName")}

            {/* Cédula */}
            {renderField("register.id", "idNumber")}

            {/* Teléfono */}
            {renderField("register.phone", "phone")}

            {/* Nombre Barbería */}
            {renderField("register.shopName", "shopName")}

            {/* Descripción */}
            {renderField("register.descripcion", "description")}

            {/* Logo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bloqueado */}
              <div className="space-y-2">
                <Label>{t("register.logo")}</Label>
                <img
                  src={mockData.logo}
                  alt="Logo actual"
                  className="w-24 h-24 object-cover rounded-md border"
                />
              </div>

              {/* Editable */}
              <div className="space-y-2">
                <Label>{t("register.logo")}</Label>
                <Input type="file" name="logo" onChange={handleChange} />
              </div>
            </div>

            {/* Departamento */}
            {renderField("register.department", "department")}

            {/* Ciudad */}
            {renderField("register.city", "city")}

            {/* Dirección */}
            {renderField("register.address", "address")}

            {/* Colores */}
            {/* Primary Color */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bloqueado */}
              <div className="space-y-2">
                <Label>{t("register.primaryColor")}</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={mockData.primaryColor}
                    disabled
                    className="w-20 h-10"
                  />
                  <Input value={mockData.primaryColor} disabled />
                </div>
              </div>

              {/* Editable */}
              <div className="space-y-2">
                <Label>{t("register.primaryColor")}</Label>
                <div className="flex items-center gap-2">
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
                    name="primaryColor"
                    value={formData.primaryColor}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Secondary Color */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bloqueado */}
              <div className="space-y-2">
                <Label>{t("register.secondaryColor")}</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={mockData.secondaryColor}
                    disabled
                    className="w-20 h-10"
                  />
                  <Input value={mockData.secondaryColor} disabled />
                </div>
              </div>

              {/* Editable */}
              <div className="space-y-2">
                <Label>{t("register.secondaryColor")}</Label>
                <div className="flex items-center gap-2">
                  <Input
                    name="secondaryColor"
                    type="color"
                    value={formData.secondaryColor}
                    onChange={handleChange}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    name="secondaryColor"
                    value={formData.secondaryColor}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full">
              {t("register.saveChanges")}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};

export default EditBarbershopInfo;
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Scissors } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Ratings = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [observation, setObservation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes procesar los datos si quieres
    navigate("/features-customer"); // redirige después de enviar
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-hero p-4 py-12 space-y-8">
      
      {/* Logo arriba */}
      <div className="text-center">
        <Link to="/" className="inline-flex items-center gap-2 text-3xl font-bold">
          <Scissors className="h-8 w-8 text-primary" />
          <span className="text-secondary dark:text-white">Barber</span>
          <span className="text-primary">Cloud</span>
        </Link>
      </div>

      {/* Tarjeta */}
      <div className="w-full max-w-2xl">
        <Card className="relative border-2 shadow-strong">
          {/* Botón de cerrar en esquina superior derecha */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-0 right-1 rounded-full hover:bg-primary/10"
            onClick={() => navigate("/features-customer")}
            aria-label="Cerrar"
          >
            <Scissors className="h-5 w-5 text-primary" />
          </Button>

          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">{t("ratings.title") || "Calificar"}</CardTitle>
            <CardDescription>{t("ratings.subtitle") || "Deja tu valoración y observación"}</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Selector de estrellas con label */}
              <div className="flex items-center gap-4">
                <label className="font-medium text-sm">{t("ratings.ratingLabel") || "Valoración"}</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-3xl transition-transform ${
                        rating >= star ? "text-yellow-400 scale-110" : "text-gray-300"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Campo de observación (textarea de 3 renglones) */}
              <div className="space-y-2">
                <label htmlFor="observation" className="block font-medium text-sm">
                  {t("ratings.observation") || "Observación"}
                </label>
                <textarea
                  id="observation"
                  name="observation"
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                  placeholder={t("ratings.observationPlaceholder") || "Escribe tu observación..."}
                  rows={3}
                  className="w-full border rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none"
                  required
                />
              </div>

              {/* Botón enviar */}
              <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 text-lg shadow-soft">
                {t("ratings.submit") || "Enviar"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Ratings;

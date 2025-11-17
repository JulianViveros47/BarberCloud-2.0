import { Star, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Barbershop {
  id: number;
  name: string;
  description: string;
  address: string;
  rating: number;
  logo: string;
}

const mockBarbershops: Barbershop[] = [
  {
    id: 1,
    name: "Elite Barber Studio",
    description: "Excelencia en cada corte",
    address: "Av. Principal 123, Centro",
    rating: 5.0,
    logo: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Golden Scissors",
    description: "Estilo y profesionalismo",
    address: "Calle Comercio 456, Plaza Norte",
    rating: 4.9,
    logo: "https://images.unsplash.com/photo-1599351431613-1ff91e3fa2f6?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Classic Barbershop",
    description: "Tradición que perdura",
    address: "Boulevard Central 789, Zona Colonial",
    rating: 4.9,
    logo: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=200&h=200&fit=crop",
  },
  {
    id: 4,
    name: "Modern Cut Studio",
    description: "Innovación en cada detalle",
    address: "Av. Reforma 321, Polanco",
    rating: 4.8,
    logo: "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?w=200&h=200&fit=crop",
  },
  {
    id: 5,
    name: "The Gentleman's Club",
    description: "Donde el estilo se encuentra",
    address: "Paseo de la Castellana 654, Distrito Financiero",
    rating: 4.8,
    logo: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=200&h=200&fit=crop",
  },
  {
    id: 6,
    name: "The Gentleman's Club",
    description: "Donde el estilo se encuentra",
    address: "Paseo de la Castellana 654, Distrito Financiero",
    rating: 4.8,
    logo: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=200&h=200&fit=crop",
  },
];

const TopBarbershops = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleEnter = (barbershopId: number) => {
    navigate("/features-customer");
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < Math.floor(rating)
                ? "fill-primary text-primary"
                : "fill-muted text-muted"
            }`}
          />
        ))}
        <span className="ml-2 font-semibold text-foreground">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-accent/30 to-background">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            {t('heroCustomer.title')}
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-black dark:text-white">
            {t('heroCustomer.subtitle')}
          </p>

        </div>

        {/* Barbershops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockBarbershops.map((shop, index) => (
            <Card
            >
              {/* Rank Badge */}
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-gradient-to-br from-primary to-[hsl(38,100%,45%)] text-primary-foreground font-bold text-lg px-3 py-1 shadow-lg border-0">
                  #{index + 1}
                </Badge>
              </div>

              <CardContent className="p-6 pt-16">
                {/* Logo and Name */}
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="w-24 h-24 mb-4 ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                    <AvatarImage src={shop.logo} alt={shop.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent text-primary text-2xl font-bold">
                      {shop.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold text-center mb-2 text-foreground">
                    {shop.name}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center italic">
                    "{shop.description}"
                  </p>
                </div>

                {/* Rating */}
                <div className="flex justify-center mb-4">
                  {renderStars(shop.rating)}
                </div>

                {/* Address */}
                <div className="flex items-start gap-2 mb-6 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                  <p className="line-clamp-2">{shop.address}</p>
                </div>

                {/* Enter Button */}
                <Button
                  onClick={() => handleEnter(shop.id)}
                  className="w-full bg-gradient-to-r from-primary to-[hsl(38,100%,45%)] hover:from-[hsl(38,100%,45%)] hover:to-primary text-primary-foreground font-semibold shadow-[var(--shadow-soft)] group-hover:shadow-[var(--shadow-strong)] transition-all duration-300"
                >
                  {t('heroCustomer.enter')}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopBarbershops;

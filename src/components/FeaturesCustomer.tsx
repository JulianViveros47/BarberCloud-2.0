import { Calendar, ShoppingBag, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; 

const FeaturesCustomer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const clientFeatures = [
    {
      icon: Calendar,
      title: t('features.client.schedule.title'),
      description: t('features.client.schedule.description'),
      route: "/",
    },
    {
      icon: ShoppingBag,
      title: t('features.client.shop.title'),
      description: t('features.client.shop.description'),
      route: "/shop",
    },
    {
      icon: Star,
      title: t('features.client.ratings.title'),
      description: t('features.client.ratings.description'),
      route: "/ratings",
    },
  ];



  return (
    <section id="caracteristicas" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Client Features */}
        <div className="mb-20">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {clientFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="border-2 hover:border-primary transition-all duration-300 hover:shadow-strong hover:-translate-y-1"
                onClick={() => navigate(feature.route)}
              >
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default FeaturesCustomer;
import { UserPlus, Users, PackagePlus, ClipboardList , Building, Store, TrendingUp, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; 

const FeaturesAdminBarber = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const clientFeatures = [
    {
      icon: UserPlus,
      title: t('featuresAdminBarber.barber.title'),
      description: t('featuresAdminBarber.barber.description'),
      route: "/",
    },
    {
      icon: Users,
      title: t('featuresAdminBarber.setBarber.title'),
      description: t('featuresAdminBarber.setBarber.description'),
      route: "/shop",
    },
    {
      icon: Building,
      title: t('featuresAdminBarber.showcase.title'),
      description: t('featuresAdminBarber.showcase.description'),
      route: "/register-modify",
    },
    {
      icon: PackagePlus,
      title: t('featuresAdminBarber.product.title'),
      description: t('featuresAdminBarber.product.description'),
      route: "/home-product",
    },
    {
      icon: ClipboardList,
      title: t('featuresAdminBarber.setProduct.title'),
      description: t('featuresAdminBarber.setProduct.description'),
      route: "/home-product-modify",
    },
    {
      icon: Store,
      title: t('featuresAdminBarber.store.title'),
      description: t('featuresAdminBarber.store.description'),
      route: "/shop-admin-barber",
    },
    {
      icon: TrendingUp,
      title: t('featuresAdminBarber.historical.title'),
      description: t('featuresAdminBarber.historical.description'),
      route: "/historical",
    },
    {
      icon: Star,
      title: t('featuresAdminBarber.ratings.title'),
      description: t('featuresAdminBarber.ratings.description'),
      route: "/ratings-admin-barber",
    }
  ];



  return (
    <section id="caracteristicas" className="py-20 bg-background">
      <div className="container mx-auto px-4">

        {/* Título llamativo */}
        <h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-16
            bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600
            bg-clip-text text-transparent drop-shadow-lg leading-normal"
        >
          {t('featuresAdminBarber.title')}
        </h2>


        {/* Client Features */}
        <div className="mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {clientFeatures.map((featuresAdminBarber, index) => (
              <Card 
                key={index} 
                className="border-2 hover:border-primary transition-all duration-300 hover:shadow-strong hover:-translate-y-1"
                onClick={() => navigate(featuresAdminBarber.route)}
              >
                <CardHeader>
                  <featuresAdminBarber.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-xl">{featuresAdminBarber.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{featuresAdminBarber.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </section>

  );
};

export default FeaturesAdminBarber;
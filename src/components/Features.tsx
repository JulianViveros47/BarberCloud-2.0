import { Calendar, ShoppingBag, Bell, CreditCard, Smartphone, Store, CalendarDays, Eye, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const Features = () => {
  const { t } = useTranslation();

  const clientFeatures = [
    {
      icon: Calendar,
      title: t('features.client.schedule.title'),
      description: t('features.client.schedule.description'),
    },
    {
      icon: ShoppingBag,
      title: t('features.client.shop.title'),
      description: t('features.client.shop.description'),
    },
    {
      icon: Bell,
      title: t('features.client.reminders.title'),
      description: t('features.client.reminders.description'),
    },
    {
      icon: CreditCard,
      title: t('features.client.payments.title'),
      description: t('features.client.payments.description'),
    },
    {
      icon: Smartphone,
      title: t('features.client.mobile.title'),
      description: t('features.client.mobile.description'),
    },
  ];

  const ownerFeatures = [
    {
      icon: Store,
      title: t('features.owner.sell.title'),
      description: t('features.owner.sell.description'),
    },
    {
      icon: CalendarDays,
      title: t('features.owner.calendar.title'),
      description: t('features.owner.calendar.description'),
    },
    {
      icon: Eye,
      title: t('features.owner.showcase.title'),
      description: t('features.owner.showcase.description'),
    },
    {
      icon: TrendingUp,
      title: t('features.owner.analytics.title'),
      description: t('features.owner.analytics.description'),
    },
  ];

  return (
    <section id="caracteristicas" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Client Features */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t('features.client.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {clientFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="border-2 hover:border-primary transition-all duration-300 hover:shadow-strong hover:-translate-y-1"
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

        {/* Owner Features */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t('features.owner.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {ownerFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="border-2 hover:border-primary transition-all duration-300 hover:shadow-strong hover:-translate-y-1"
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

export default Features;
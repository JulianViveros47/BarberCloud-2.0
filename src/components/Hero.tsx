import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import carousel1 from "@/assets/carousel-1.jpg";
import carousel2 from "@/assets/carousel-2.jpg";
import carousel3 from "@/assets/carousel-3.jpg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { t } = useTranslation();

  const carouselImages = [
    { src: carousel1, alt: "Modern barbershop interior" },
    { src: carousel2, alt: "Premium barber products" },
    { src: carousel3, alt: "Satisfied customer" },
  ];

  const navigate = useNavigate();

  return (
    <section id="inicio" className="pt-32 pb-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {t("hero.title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-strong text-lg"
                onClick={() => navigate("/login")}
              >
                {t("hero.explore")}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                onClick={() => navigate("/registro")}
              >
                {t("hero.start")}
              </Button>
            </div>
          </div>

          <div className="animate-fade-in">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {carouselImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative rounded-2xl overflow-hidden shadow-elegant">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-[400px] md:h-[500px] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

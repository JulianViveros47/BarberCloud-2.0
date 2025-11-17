import { useEffect, useState } from "react";
import { ReviewsTable, Review } from "@/components/ratings/RatingsTable";
import { useTranslation } from "react-i18next";


const ITEMS_PER_PAGE = 5;

export const ReviewsPage = () => {
  const { t } = useTranslation();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 Simulación: Cargar datos (luego puedes reemplazar por fetch a tu API)
  useEffect(() => {
    const fakeReviews: Review[] = [
      { id: "1", cantidadEstrellas: 5, observacion: "Excelente servicio" },
      { id: "2", cantidadEstrellas: 4, observacion: "Muy buena atención" },
      { id: "3", cantidadEstrellas: 3, observacion: "Servicio aceptable" },
      { id: "4", cantidadEstrellas: 2, observacion: "Podría mejorar" },
      { id: "5", cantidadEstrellas: 1, observacion: "Mala experiencia" },
      { id: "6", cantidadEstrellas: 4, observacion: "Buen corte, volveré" },
    ];

    setReviews(fakeReviews);
  }, []);

  // 🔹 Calcular paginación
  const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE);
  const paginatedReviews = reviews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // 🔹 Editar reseña (placeholder)
  const handleEdit = (review: Review) => {
    console.log("Editar reseña:", review);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-4xl font-bold text-primary text-center my-8">
        {t("reviews.title")}
        </h1>

      {/* Botón para agregar reseña */}
      

      {/* Tabla */}
      <ReviewsTable
        reviews={paginatedReviews}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        
        onEdit={handleEdit}
      />
    </div>
  );

};

export default ReviewsPage;
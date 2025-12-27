import TestimonialCard from "../../../Components/TestimonialCard/TestimonialCard";
import { useTranslation } from "react-i18next";

function Testimonial() {
  const { t } = useTranslation();
  const cards = t("testimonial.cards", { returnObjects: true });

  return (
    <div className="container py-5">
      <div className="row g-4">
        {cards.map((card, index) => (
          <TestimonialCard
            key={index}
            image={card.image}
            name={card.name}
            grade={card.grade}
            content={card.content}
          />
        ))}
      </div>
    </div>
  );
}

export default Testimonial;

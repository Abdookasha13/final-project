import { useTranslation } from "react-i18next";
import "./CategoryCard.css";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language.startsWith("ar") ? "ar" : "en";
  const navigate = useNavigate();

  return (
    <>
      <div className="category-card">
        <div className="wrapper-icon">
          <i className={category.icon}></i>
        </div>

        <h5 className="category-name">{category.name[lang]}</h5>
        <button
          onClick={() => {
            navigate(`/courses/${category._id}/${category.name[lang]}`);
          }}
          className="courses-count py-1 px-2"
        >
          <i className="bi bi-book"></i> {category.coursesCount || 0}{" "}
          {t("categories.coursesCount")}{" "}
        </button>
        <div className="btns d-flex justify-content-between mt-2"></div>
      </div>
    </>
  );
};

export default CategoryCard;
